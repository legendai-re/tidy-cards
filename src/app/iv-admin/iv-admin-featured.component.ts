import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute }       from '@angular/router';
import { Http, Response, Headers, RequestOptions, URLSearchParams  } from '@angular/http';
import { Observable }             from 'rxjs/Observable';
import { IvApiUrl }               from '../iv-shared/iv-api-url';
import { IvCollectionService }    from '../iv-collection/iv-collection.service';
import { IvCollection }           from '../iv-collection/iv-collection.class';
import { IvCollectionCardComponent } from '../iv-collection/iv-collection-card/iv-collection-card.component';

@Component({
    templateUrl: './iv-admin-featured.component.html',
    directives: [IvCollectionCardComponent]
})

export class IvAdminFeaturedComponent implements OnInit {

    public searchCollectionId: string;
    public collection: IvCollection;
    public featuredCollections: IvCollection[];

    constructor (private collectionService: IvCollectionService, private http: Http) {
    }

    ngOnInit(){
        this.loadFeaturedCollections();
    }

    public searchColletion(){
        let getParams = new URLSearchParams();
        getParams.set('populate', '_author+_thumbnail');
        this.collectionService.getCollection(this.searchCollectionId, getParams).subscribe((collection) => {
            this.collection = collection;
        })
    }

    public searchAnother(){
        this.collection = null;
    }

    private loadFeaturedCollections(){
        let params = new URLSearchParams();
        params.set('limit', '8');
        params.set('sort_field', 'createdAt');
        params.set('sort_dir', '-1');
        params.set('isFeatured', 'true');
        this.collectionService.getCollections(params).subscribe(collections => {
            this.featuredCollections = collections;
        }, () => {});
    }

    public updateCollection(){
        this.collectionService.putCollection(this.collection).subscribe((collection) => {
            console.log('done')
        })
    }

}
