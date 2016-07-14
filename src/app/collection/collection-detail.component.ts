import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute }       from '@angular/router';
import { URLSearchParams  }             from '@angular/http';
import { Observable }             from 'rxjs/Observable';
import { SafeResourceUrl, DomSanitizationService } from '@angular/platform-browser';
import { CollectionService }            from './collection.service';
import { Collection }                   from './collection.class';

@Component({
    templateUrl: './collection-detail.component.html'
})

export class CollectionDetailComponent implements OnInit, OnDestroy {
    public collection: Collection;
    public link: string;
    public isYoutube: boolean;
    public youtubeId: SafeResourceUrl;
    public imageUrl: SafeResourceUrl;
    public randomUrl: SafeResourceUrl;
    public isImage: boolean;
    public isRandom: boolean;
    private sub: any;

    constructor(private sanitizer: DomSanitizationService, private route: ActivatedRoute, private router: Router, private service: CollectionService) {

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
        this.testImagePromise(this.link).subscribe((success) => {
            if(success){
                this.isImage = true;
                this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(this.link);
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

    isAnImage(url){
        return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
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

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
