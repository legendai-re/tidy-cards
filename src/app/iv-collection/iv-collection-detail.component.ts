import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { SafeResourceUrl, DomSanitizationService } from '@angular/platform-browser';
import { Router, ActivatedRoute }       from '@angular/router';
import { Observable }             from 'rxjs/Observable';
import { IvCollectionService }            from './iv-collection.service';
import { IvItemService }                  from '../iv-item/iv-item.service';
import { IvCollection }                   from './iv-collection.class';
import { IvItemCreateComponent }          from '../iv-item/iv-item-create.component';

@Component({
    templateUrl: './iv-collection-detail.component.html',
    styleUrls: ['iv-collection-detail.component.scss'],
    directives: [IvItemCreateComponent]
})

export class IvCollectionDetailComponent implements OnInit, OnDestroy {
    public collection: IvCollection;
    public itemLoaded: boolean;
    private sub: any;

    constructor(private sanitizer: DomSanitizationService, private route: ActivatedRoute, private router: Router, private collectionService: IvCollectionService,private itemService: IvItemService) {
    }

    ngOnInit() {
        this.itemLoaded = false;
        this.sub = this.route.params.subscribe(params => {
            this.initCollection(params);
        });
    }

    initCollection(params){
        let id = params['collection_id'];
        let getParams = new URLSearchParams();
        getParams.set('populate', '_author+_thumbnail');
        this.collectionService.getCollection(id, getParams).subscribe((collection) => {
            this.collection = collection;
            this.initItems();
        }, () => {});
    }

    initItems(){
        let getParams = new URLSearchParams();
        getParams.set('_collection', this.collection._id);
        this.itemService.getItems(getParams).subscribe((_items) => {
            this.collection._items = _items;
            for(var key in this.collection._items){
                if(this.collection._items[key].type.id == 'YOUTUBE'){
                    this.collection._items[key]._content.trustedEmbedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.collection._items[key]._content.embedUrl);
                }
            }
            this.itemLoaded = true;
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
