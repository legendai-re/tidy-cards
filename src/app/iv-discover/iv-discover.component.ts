import { Component, OnInit }               from '@angular/core';
import { ROUTER_DIRECTIVES, Router }       from '@angular/router';
import { URLSearchParams  }                from '@angular/http';
import { IvCollectionService }             from '../iv-collection/iv-collection.service';
import { IvCollectionCardComponent }       from '../iv-collection/iv-collection-card.component';
import { IvCollection }                    from '../iv-collection/iv-collection.class';
import { IvDataLimit }                     from '../iv-shared/iv-data-limit.ts';

@Component({
    templateUrl: './iv-discover.component.html',
    styleUrls: ['./iv-discover.component.scss'],
    directives: [ROUTER_DIRECTIVES, IvCollectionCardComponent]
})
export class IvDiscoverComponent implements OnInit {

    public pageNb: number;
    public haveMoreCollections: boolean;
    public loadingCollections: boolean;
    public collections: IvCollection[];

    constructor( private router: Router, private collectionService: IvCollectionService) {
    }

    ngOnInit() {
        this.pageNb = 0;
        this.loadingCollections = false;
        this.haveMoreCollections = true;
        this.collections = [];
        this.loadCollections();
    }

    public loadNextPage(){
        if(this.haveMoreCollections){
            this.pageNb++;
            this.loadCollections();
        }else{
            console.log('no more collections');
        }
    }

    private loadCollections(){
        this.loadingCollections = true;
        let params = new URLSearchParams();
        params.set('limit', IvDataLimit.COLLECTION.toString());
        params.set('skip', (IvDataLimit.COLLECTION * this.pageNb).toString());
        params.set('sort_field', 'createdAt');
        params.set('sort_dir', '-1');
        this.collectionService.getCollections(params).subscribe(collections => {
            this.onCollectionsReceived(collections);
        }, () => {});
    }

    private onCollectionsReceived(collections){
        for(let i in collections)
            this.collections.push(collections[i]);
        this.haveMoreCollections = (collections.length==IvDataLimit.COLLECTION);
        this.loadingCollections = false;
    }

}
