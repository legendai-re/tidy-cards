import { Component, OnInit, OnDestroy } from '@angular/core';
import { Jsonp, Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Router, ActivatedRoute }       from '@angular/router';
import { Observable }             from 'rxjs/Observable';
import { SafeResourceUrl, DomSanitizationService } from '@angular/platform-browser';
import { IvCollectionService }            from './iv-collection.service';
import { IvCollection }                   from './iv-collection.class';
import { JSONP_PROVIDERS }  from '@angular/http';

@Component({
    templateUrl: './iv-collection-detail.component.html',
    providers: [JSONP_PROVIDERS]
})

export class IvCollectionDetailComponent implements OnInit, OnDestroy {
    public collection: IvCollection;
    public link: string;
    public isYoutube: boolean;
    public isTweet: boolean;
    public tweetData: any;
    public youtubeId: SafeResourceUrl;
    public imageUrl: SafeResourceUrl;
    public randomUrl: SafeResourceUrl;
    public isImage: boolean;
    public isRandom: boolean;
    private sub: any;

    constructor(private jsonp: Jsonp, private http: Http, private sanitizer: DomSanitizationService, private route: ActivatedRoute, private router: Router, private service: IvCollectionService) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            let id = params['collection_id'];
            let getParams = new URLSearchParams();
            getParams.set('populate', '_author+_thumbnail');
            this.service.getCollection(id, getParams).subscribe((collection) => {
                this.collection = collection;
            }, () => {});
        });
    }

    checkLink() {
        this.isYoutube = false;
        this.isImage = false;
        this.isRandom = false;
        this.isTweet = false;
        this.testImagePromise(this.link).subscribe((success) => {
            if(success){
                this.isImage = true;
                this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(this.link);
            }else if(this.getIsTweet(this.link)){
                this.getEmbedTweet(this.link).subscribe((data)=>{
                    this.tweetData = data;
                    this.isTweet = true;
                    //twttr.widgets.load();
                });
            }else if(this.getYoutubeVideoId(this.link)){
                this.isYoutube = true;
                this.youtubeId = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/"+this.getYoutubeVideoId(this.link));
            }else{
                this.isRandom = true;
                this.randomUrl = this.sanitizer.bypassSecurityTrustUrl(this.link);
                console.log('random');
            }
        })
    }

    getYoutubeVideoId(url) {
        var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        return (url.match(p)) ? RegExp.$1 : null;
    }

    getIsTweet(url){
        var p = /^(?:https?:\/\/)?(?:www\.)?twitter\.com\/(\w+)\/status(es)?\/(\d{18})(\/)?$/;
        return (url.match(p)) ? true : false;
    }

    public testImagePromise(url): Observable<Boolean> {
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

    public getEmbedTweet (url: string){
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

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
