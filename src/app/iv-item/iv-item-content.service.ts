import { Jsonp, Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Injectable }             from '@angular/core';
import { Observable }             from 'rxjs/Observable';
import { SafeResourceUrl, DomSanitizationService } from '@angular/platform-browser';
import { IvItem }                 from './iv-item.class';
import { IvItemUrl }              from './iv-item-url.class';
import { IvItemYoutube }          from './iv-item-youtube.class';
import { IvApiUrl }               from '../iv-shared/iv-api-url';

@Injectable()
export class IvItemContentService {

    constructor (private jsonp: Jsonp, private sanitizer: DomSanitizationService, private http: Http) {}

    public getContentFromUrl(entryUrl): Promise<any>{
        return new Promise((resolve, reject) => {
            var result;
            this.getIsImage(entryUrl).subscribe((success) => {
                if(success){

                }else if(this.getIsTweet(entryUrl)){
                    this.getEmbedTweet(entryUrl).subscribe((data)=>{

                    });
                }else if(this.getYoutubeVideoId(entryUrl)){
                    result = {
                        type: IvItem.ITEM_TYPES.YOUTUBE,
                        _content: this.createItemYoutube(entryUrl, this.getYoutubeVideoId(entryUrl))
                    };
                    resolve(result);
                }else{
                    result = {
                        type: IvItem.ITEM_TYPES.URL,
                        _content: this.createItemUrl(entryUrl)
                    };
                    resolve(result);
                }
            })
        })
    }

    private createItemUrl(entryUrl){
        var itemUrl = new IvItemUrl();
        itemUrl.url = entryUrl;
        return itemUrl;
    }

    private createItemYoutube(entryUrl, videoId){
        var itemYoutube = new IvItemYoutube();
        itemYoutube.url = entryUrl;
        itemYoutube.videoId = videoId;
        itemYoutube.embedUrl = 'https://www.youtube.com/embed/'+videoId;
        itemYoutube.trustedEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(itemYoutube.embedUrl);
        return itemYoutube;
    }

    private getYoutubeVideoId(url) {
        var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        return (url.match(p)) ? RegExp.$1 : null;
    }

    private getIsTweet(url){
        var p = /^(?:https?:\/\/)?(?:www\.)?twitter\.com\/(\w+)\/status(es)?\/(\d{18})(\/)?$/;
        return (url.match(p)) ? true : false;
    }

    private getIsImage(url): Observable<Boolean> {
        return Observable.create(observer => {
            var timeout = 2000;
            var timedOut = false, timer;
            var img = new Image();
            img.onerror = img.onabort = function() {
                if (!timedOut) {
                    clearTimeout(timer);
                    observer.next(false);
                    observer.complete();
                }
            };
            img.onload = function() {
                if (!timedOut) {
                    clearTimeout(timer);
                    observer.next(true);
                    observer.complete();
                }
            };
            img.src = url;
            timer = setTimeout(function() {
                timedOut = true;
                observer.next(false);
                observer.complete();
            }, timeout);
        });
    }

    private getEmbedTweet (url: string){
        let params = new URLSearchParams();
        params.set('url', encodeURI(url));
        params.set('format', 'json');
        params.set('callback', 'JSONP_CALLBACK');
        return this.jsonp
               .get('https://publish.twitter.com/oembed', { search: params })
               .map(this.handleEmbedTweet);
    }

    private handleEmbedTweet(res: Response) {
        let body = res.json();
        return body;
    }

}
