import { Component, OnInit, EventEmitter, OnDestroy }   from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { SafeResourceUrl, DomSanitizationService } from '@angular/platform-browser';
import { Router, ActivatedRoute }         from '@angular/router';
import { Observable }                     from 'rxjs/Observable';
import { IvAuthService }                  from '../iv-auth/iv-auth.service';
import { IvCollectionService }            from './iv-collection.service';
import { IvItemService }                  from '../iv-item/iv-item.service';
import { IvCollection }                   from './iv-collection.class';
import { IvItemCreateComponent }          from '../iv-item/iv-item-create.component';
import { IvHeaderService }                from '../iv-header/iv-header.service';
import { IvItemComponent }                from '../iv-item/iv-item.component';

@Component({
    templateUrl: './iv-collection-detail.component.html',
    styleUrls: ['iv-collection-detail.component.scss'],
    directives: [IvItemCreateComponent, IvItemComponent]
})

export class IvCollectionDetailComponent implements OnInit, OnDestroy {
    public collection: IvCollection;
    public itemLoaded: boolean;
    public isAuthor: boolean;
    private sub: any;

    constructor(
        private authService: IvAuthService,
        private headerService: IvHeaderService,
        private sanitizer: DomSanitizationService,
        private route: ActivatedRoute,
        private router: Router,
        private collectionService: IvCollectionService,
        private itemService: IvItemService) {
    }

    ngOnInit() {
        this.isAuthor = false;
        this.itemLoaded = false;
        this.sub = this.route.params.subscribe(params => {
            this.initCollection(params);
        });
    }

    private initCollection(params){
        let id = params['collection_id'];
        let getParams = new URLSearchParams();
        getParams.set('populate', '_author+_thumbnail');
        this.collectionService.getCollection(id, getParams).subscribe((collection) => {
            this.collection = collection;
            if(collection._author._id == this.authService.currentUser._id)
                this.isAuthor = true;
            this.emitUpdateHeaderEvent();
            this.initItems();
        }, () => {});
    }

    private emitUpdateHeaderEvent(){
        var type = this.collection._thumbnail ? 'IMAGE' : 'COLOR';
        var color = this.collection.color;
        var image = this.collection._thumbnail ? this.collection._thumbnail.getPath('original') : '';
        this.headerService.emitUpdateHeaderEvent({
            value:{
                type: type,
                color: color,
                image: image
            }
        });
    }

    private initItems(){
        let getParams = new URLSearchParams();
        getParams.set('_collection', this.collection._id);
        getParams.set('sort_field', 'createdAt');
        getParams.set('sort_dir', '-1');
        this.itemService.getItems(getParams).subscribe((_items) => {
            this.collection._items = _items;
            this.createTrustedRessources();
            this.itemLoaded = true;
            this.renderTweets();
        });
    }

    private renderTweets(){
        setTimeout(()=>{
           window.document.getElementById('render_tweet').click();
       },200)
    }

    private createTrustedRessources(){
        for(var key in this.collection._items){
            if(this.collection._items[key].type.id == 'YOUTUBE'){
                this.collection._items[key]._content.trustedEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.collection._items[key]._content.embedUrl);
            }
        }
    }

    public deleteCollection(){
        this.collectionService.deleteCollection(this.collection._id).subscribe((e) => {
            this.router.navigate(['/dashboard']);
        })
    }

    public onNewItem(event){
        if(event.value){
            this.collection._items.unshift(event.value);
            this.collection.itemsCount++;
            this.renderTweets();
        }
    }

    public onDeletedItem(event){
        if(event.value && event.value._id){
            for(var i=0; i<this.collection._items.length; i++){
                if(this.collection._items[i]._id == event.value._id){
                    this.collection._items.splice(i, 1);
                    this.collection.itemsCount--;
                }
            }
        }
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
