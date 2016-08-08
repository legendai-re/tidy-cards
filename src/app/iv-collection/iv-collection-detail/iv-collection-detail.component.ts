import { Component, OnInit, EventEmitter, OnDestroy }   from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { SafeResourceUrl, DomSanitizationService } from '@angular/platform-browser';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute }         from '@angular/router';
import { Observable }                     from 'rxjs/Observable';
import { IvAuthService }                  from '../../iv-auth/iv-auth.service';
import { IvStarService }                  from '../../iv-star/iv-star.service';
import { IvCollectionCreateComponent }    from '../iv-collection-create/iv-collection-create.component';
import { IvCollectionService }            from '../iv-collection.service';
import { IvItemService }                  from '../../iv-item/iv-item.service';
import { IvCollection }                   from '../iv-collection.class';
import { IvItemCreateComponent }          from '../../iv-item/iv-item-create/iv-item-create.component';
import { IvHeaderService }                from '../../iv-header/iv-header.service';
import { IvItemComponent }                from '../../iv-item/iv-item.component';
import { IvDataLimit }                    from '../../iv-shared/iv-data-limit.ts';
import { IvSortableDirective }            from'../../iv-shared/iv-sortable.directive';

@Component({
    templateUrl: './iv-collection-detail.component.html',
    styleUrls: ['iv-collection-detail.component.scss'],
    directives: [ROUTER_DIRECTIVES, IvCollectionCreateComponent, IvItemCreateComponent, IvItemComponent, IvSortableDirective]
})

export class IvCollectionDetailComponent implements OnInit, OnDestroy {

    public collection: IvCollection;
    public pageNb: number;
    public haveMoreItems: boolean;
    public loadingItems: boolean;
    public itemLoaded: boolean;
    public isAuthor: boolean;
    public isUpdatingStar: boolean;
    public updateCollectionIntent: boolean;
    public isUpdatingPosition: boolean;
    private sub: any;

    constructor(
        private authService: IvAuthService,
        private headerService: IvHeaderService,
        private sanitizer: DomSanitizationService,
        private route: ActivatedRoute,
        private router: Router,
        private collectionService: IvCollectionService,
        private itemService: IvItemService,
        private starService: IvStarService) {
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
        this.haveMoreItems = (items.length==IvDataLimit.ITEM);
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
        if(this.isAuthor || this.isUpdatingStar)
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
        }
    }

    public onDeletedItem(event){
        if(event.value && event.value._id){
            for(let i in this.collection._items){
                if(this.collection._items[i]._id == event.value._id){
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
