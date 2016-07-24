import { Component, OnInit, EventEmitter, OnDestroy }   from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { SafeResourceUrl, DomSanitizationService } from '@angular/platform-browser';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute }         from '@angular/router';
import { Observable }                     from 'rxjs/Observable';
import { IvAuthService }                  from '../iv-auth/iv-auth.service';
import { IvCollectionService }            from './iv-collection.service';
import { IvItemService }                  from '../iv-item/iv-item.service';
import { IvCollection }                   from './iv-collection.class';
import { IvItemCreateComponent }          from '../iv-item/iv-item-create.component';
import { IvHeaderService }                from '../iv-header/iv-header.service';
import { IvItemComponent }                from '../iv-item/iv-item.component';
import { IvDataLimit }                    from '../iv-shared/iv-data-limit.ts';

@Component({
    templateUrl: './iv-collection-detail.component.html',
    styleUrls: ['iv-collection-detail.component.scss'],
    directives: [ROUTER_DIRECTIVES, IvItemCreateComponent, IvItemComponent]
})

export class IvCollectionDetailComponent implements OnInit, OnDestroy {

    public collection: IvCollection;
    public pageNb: number;
    public haveMoreItems: boolean;
    public loadingItems: boolean;
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
        this.pageNb = 0;
        this.loadingItems = false;
        this.haveMoreItems = true;
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
            this.collection._items = [];
            if(this.authService.isLoggedIn && collection._author._id == this.authService.currentUser._id)
                this.isAuthor = true;
            this.emitUpdateHeaderEvent();
            this.loadItems();
        }, () => {});
    }

    private emitUpdateHeaderEvent(){
        this.headerService.emitUpdateHeaderEvent({
            value:{
                type: this.collection._thumbnail ? 'IMAGE' : 'COLOR',
                color: this.collection.color,
                image:  this.collection._thumbnail ? this.collection._thumbnail.getPath('1000x400') : '',
                title: this.collection.title
            }
        });
    }

    private loadItems(){
        this.loadingItems = true;
        let params = new URLSearchParams();
        params.set('_collection', this.collection._id);
        params.set('limit', IvDataLimit.ITEM.toString());
        params.set('skip', (IvDataLimit.ITEM * this.pageNb).toString());
        params.set('sort_field', 'createdAt');
        params.set('sort_dir', '-1');
        this.itemService.getItems(params).subscribe((items) => {
            this.onItemsReceived(items);
        });
    }

    private onItemsReceived(items){
        for(let i in items)
            this.collection._items.push(items[i]);
        this.renderTweets();
        this.haveMoreItems = (items.length==IvDataLimit.ITEM);
        this.loadingItems = false;
        this.itemLoaded = true;
    }

    private renderTweets(){
        setTimeout(()=>{
           window.document.getElementById('render_tweet').click();
       },200)
    }

    public loadNextPage(){
        if(this.haveMoreItems){
            this.pageNb++;
            this.loadItems();
        }else{
            console.log('no more items');
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
