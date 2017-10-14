import { Component, OnInit, EventEmitter, OnDestroy  }   from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Router, ActivatedRoute }         from '@angular/router';
import { Observable }                     from 'rxjs/Observable';
import { TcLanguageService }              from '../../tc-language/tc-language.service';
import { TcAuthService }                  from '../../tc-auth/tc-auth.service';
import { TcStarService }                  from '../../tc-star/tc-star.service';
import { TcCollectionService }            from '../tc-collection.service';
import { TcItemService }                  from '../../tc-item/tc-item.service';
import { TcCollection }                   from '../tc-collection.class';
import { TcHeaderService }                from '../../tc-header/tc-header.service';
import { TcItemComponent }                from '../../tc-item/tc-item.component';
import { TcItem }                         from '../../tc-item/tc-item.class';
import { TcDataLimit }                    from '../../tc-shared/tc-data-limit';

@Component({
    templateUrl: './tc-collection-detail.component.html',
    styleUrls: ['tc-collection-detail.component.scss']
})

export class TcCollectionDetailComponent implements OnInit, OnDestroy {

    public collection: TcCollection;
    public searchParams: string;
    public isLoadingCollection: boolean;
    public pageNb: number;
    public haveMoreItems: boolean;
    public loadingItems: boolean;
    public itemLoaded: boolean;
    public isAuthor: boolean;
    public isUpdatingStar: boolean;
    public updateCollectionIntent: boolean;
    public isUpdatingPosition: boolean;
    public subCollectionTemplate: TcCollection;
    private sub: any;

    constructor(
        public t: TcLanguageService,
        private authService: TcAuthService,
        private headerService: TcHeaderService,
        private route: ActivatedRoute,
        private router: Router,
        private collectionService: TcCollectionService,
        private itemService: TcItemService,
        private starService: TcStarService) {
    }

    ngOnInit() {
        this.pageNb = 0;
        this.loadingItems = false;
        this.haveMoreItems = true;
        this.isAuthor = false;
        this.subCollectionTemplate = new TcCollection();
        this.itemLoaded = false;
        this.sub = this.route.params.subscribe(params => {
            this.initCollection(params);
        });
    }

    private initCollection(params){
        this.searchParams = params['collection_id'];
        let getParams = new URLSearchParams();
        getParams.set('populate', '_author+_thumbnail');
        this.isLoadingCollection = true;
        this.collectionService.getCollection(this.searchParams, getParams).subscribe((collection) => {
            this.collection = collection;
            this.collection._items = [];
            if(this.authService.isLoggedIn && collection._author._id === this.authService.currentUser._id)
                this.isAuthor = true;
            this.isLoadingCollection = false;
            this.emitUpdateHeaderEvent();
            this.loadItems();
        }, () => {this.isLoadingCollection = false;});
    }

    private emitUpdateHeaderEvent(){
        this.headerService.emitUpdateHeaderEvent({
            value:{                
                type: 'collection',
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
        params.set('limit', TcDataLimit.ITEM.toString());
        params.set('skip', (TcDataLimit.ITEM * this.pageNb).toString());
        params.set('custom_sort', 'true');
        this.itemService.getItems(params).subscribe((items) => {
            this.onItemsReceived(items);
        });
    }

    private onItemsReceived(items){
        items.sort(function(a, b){
            if(a.position < b.position) return -1;
            if(a.position > b.position) return 1;
            return 0;
        });
        for(let i in items)
            this.collection._items.push(items[i]);
        this.haveMoreItems = (items.length===TcDataLimit.ITEM);
        this.loadingItems = false;
        this.itemLoaded = true;
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

    public onStarCliked(){
        if(!this.authService.isLoggedIn || this.isUpdatingStar)
            return;
        if(!this.collection._star){
            this.addStarredCollection();
        }else{
            this.removeStarredCollection();
        }
    }

    public startUpdateCollection(){
        this.updateCollectionIntent = true;
    }

    public onUpdateCollectionCanceled(){
        this.updateCollectionIntent = false;
    }

    public onCollectionUpdated(event){
        if(event.value){
            this.collection.title = event.value.title;
            this.collection.bio = event.value.bio;
            this.collection.color = event.value.color;
            this.collection.visibility = event.value.visibility;
            this.collection._thumbnail = event.value._thumbnail;
            this.emitUpdateHeaderEvent();
        }
        this.updateCollectionIntent = false;
    }

    private addStarredCollection(){
        this.isUpdatingStar = true;
        this.starService.postStar(this.collection).subscribe((star) => {
            this.collection._star = star;
            this.collection.starsCount++;
            this.isUpdatingStar = false;
        });
    }

    private removeStarredCollection(){
        this.starService.deleteStare(this.collection._star).subscribe((response) => {
            this.collection._star = null;
            this.collection.starsCount--;
            this.isUpdatingStar = false;
        })
    }

    public onItemMoved(event){
        this.isUpdatingPosition = true;
        this.itemService.putItem(event.value.modifiedItem).subscribe(collection => {
            this.isUpdatingPosition = false;
        }, (err) => {
            this.collection._items = [];
            this.pageNb = 0;
            this.loadItems();
            this.isUpdatingPosition = false;
        });
    }

    public onNewItem(event){
        if(event.value){
            this.collection._items.unshift(event.value);
            for(let i in this.collection._items){
                this.collection._items[i].position = parseInt(i);
            }
            this.collection.itemsCount++;
            //$('#myModal').modal('hide');

        }
    }

    public onSubCollectionCreated(event){
        let itemCollection = new TcItem();
        itemCollection._content = event.value;
        itemCollection.type = TcItem.ITEM_TYPES.COLLECTION;
        itemCollection._collection = this.collection._id;
        this.itemService.postItem(itemCollection).subscribe((response) => {
            this.router.navigate(['/c', event.value._id]);
        })
    }

    public onDeletedItem(event){
        if(event.value && event.value._id){
            for(let i in this.collection._items){
                if(this.collection._items[i]._id === event.value._id){
                    this.collection._items.splice(parseInt(i), 1);
                    for(let x in this.collection._items){
                        this.collection._items[x].position = parseInt(x);
                    }
                    this.collection.itemsCount--;
                }
            }
        }
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}