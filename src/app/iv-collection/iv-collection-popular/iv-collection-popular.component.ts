import { Component, OnInit }   from '@angular/core';
import { Router } from '@angular/router';
import { URLSearchParams  }   from '@angular/http';
import { IvCollectionService }   from '../iv-collection.service';
import { IvCollection }   from '../iv-collection.class';
import { IvDataLimit }    from '../../iv-shared/iv-data-limit';

@Component({
    templateUrl: './iv-collection-popular.component.html'
})

export class IvCollectionPopularComponent implements OnInit {

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
        params.set('sort_field', 'starsCount');
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
