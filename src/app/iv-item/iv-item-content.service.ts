import { Jsonp, Http, Response, URLSearchParams } from '@angular/http';
import { Injectable }             from '@angular/core';
import { Observable }             from 'rxjs/Observable';
import { DomSanitizationService } from '@angular/platform-browser';
import { IvItem }                 from './iv-item.class';
import { IvItemUrl }              from './iv-item-url/iv-item-url.class';
import { IvItemYoutube }          from './iv-item-youtube/iv-item-youtube.class';
import { IvItemImage }            from './iv-item-image/iv-item-image.class';
import { IvItemTweet }            from './iv-item-tweet/iv-item-tweet.class';
import { IvApiUrl }               from '../iv-shared/iv-api-url';

@Injectable()
export class IvItemContentService {

    constructor (private jsonp: Jsonp, private sanitizer: DomSanitizationService, private http: Http) {
    }

    public getContentFromUrl(entryUrl): Promise<any>{
        return new Promise((resolve, reject) => {
            let result;

            this.getIsImage(entryUrl).subscribe((sucess)=>{
                if(sucess){
                    this.createItemImage(entryUrl).subscribe((itemImage) => {
                        result = {
                            type: IvItem.ITEM_TYPES.IMAGE,
                            _content: itemImage
                        };
                        resolve(result);
                    })
                }
            });

            if(this.simpleGetIsImage(entryUrl)){
                this.createItemImage(entryUrl).subscribe((itemImage) => {
                    result = {
                        type: IvItem.ITEM_TYPES.IMAGE,
                        _content: itemImage
                    };
                    resolve(result);
                })
            }else if(this.getIsTweet(entryUrl)){
                this.getEmbedTweet(entryUrl).subscribe((itemTweet)=>{
                    result = {
                        type: IvItem.ITEM_TYPES.TWEET,
                        _content: itemTweet
                    };
                    resolve(result);
                });
            }else if(this.getYoutubeVideoId(entryUrl)){
                this.createItemYoutube(this.getYoutubeVideoId(entryUrl)).subscribe((itemYoutube) => {
                    result = {
                        type: IvItem.ITEM_TYPES.YOUTUBE,
                        _content: itemYoutube
                    };
                    resolve(result);
                })
            }else{
                let noHttpUrl = this.removeHttp(entryUrl);
                let host = noHttpUrl.split('/')[0];
                let path = noHttpUrl.substr(host.length);
                if(host===''){
                    resolve(null);
                }else{
                    this.getItemUrl(host, path).subscribe((itemUrl) => {
                        if(!itemUrl){
                            resolve(null);
                        }else{
                            result = {
                                type: IvItem.ITEM_TYPES.URL,
                                _content: itemUrl
                            };
                            resolve(result);
                        }
                    }, () => {
                        resolve(null);
                    });
                }
            }
        });
    }

    private createItemYoutube(videoId): Observable<IvItemYoutube>{
        let params = new URLSearchParams();
        params.set('video_id', videoId);
        return this.http.get(IvApiUrl.ITEMS_YOUTUBE, { search: params })
        .map(function(res: Response) {
            let body = res.json();
            let itemYoutube = IvItemYoutube.createFormJson(body.data);
            return itemYoutube;
        });
    }

    private createItemImage(entryUrl): Observable<IvItemImage>{
        let params = new URLSearchParams();
        params.set('image_url', encodeURIComponent(entryUrl));
        return this.http.get(IvApiUrl.ITEMS_IMAGE, { search: params })
        .map(function(res: Response) {
            let body = res.json();
            return (!body.error) ? IvItemImage.createFormJson(body.data): null;
        });
    }

    private getYoutubeVideoId(url) {
        let p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        return (url.match(p)) ? RegExp.$1 : null;
    }

    private getIsTweet(url){
        let p = /^(?:https?:\/\/)?(?:www\.)?twitter\.com\/(\w+)\/status(es)?\/(\d{18})(\/)?$/;
        return (url.match(p)) ? true : false;
    }

    private removeHttp(url){
        if(url.substring(0, 7) === 'http://'){
            url = url.substr(7);
        }else if(url.substring(0, 8) === 'https://'){
            url = url.substr(8);
        }
        return url;
    }

    private getItemUrl(host, path): Observable<IvItemUrl>{
        let params = new URLSearchParams();
        params.set('host', host);
        params.set('path', encodeURIComponent(path));
        return this.http.get(IvApiUrl.ITEMS_URL, { search: params })
        .map(function(res: Response) {
            let body = res.json();
            return (!body.error) ? IvItemUrl.createFormJson(body.data): null;
        });
    }

    private simpleGetIsImage(url){
         return(url.match(/\.(jpeg|jpg|gif|png)$/) !== null);
    }

    private getIsImage(url): Observable<Boolean> {
        return Observable.create(observer => {
            let timeout = 5000;
            let timedOut = false, timer;
            let img = new Image();
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

    private getEmbedTweet (url: string): Observable<IvItemTweet>{
        if(url.charAt(url.length-1) === '/'){
            url = url.substring(0, url.length - 1);
        }
        let params = new URLSearchParams();
        params.set('tweet_url', encodeURI(url));
        return this.http.get(IvApiUrl.ITEMS_TWEET, { search: params })
        .map(function(res: Response) {
            let body = res.json();
            let itemTweet = IvItemTweet.createFormJson(body.data);
            return itemTweet;
        });
    }

    private handleEmbedTweet(res: Response) {
        let body = res.json();
        return body;
    }

}
