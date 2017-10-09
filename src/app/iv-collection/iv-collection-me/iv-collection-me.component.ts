import { Component, OnInit }               from '@angular/core';
import { Router }       from '@angular/router';
import { URLSearchParams  }                from '@angular/http';
import { IvCollectionService }             from '../iv-collection.service';
import { IvCollection }                    from '../iv-collection.class';
import { IvDataLimit }                     from '../../iv-shared/iv-data-limit';
import { IvAuthService }                   from '../../iv-auth/iv-auth.service';

@Component({
    templateUrl: './iv-collection-me.component.html'
})

export class IvCollectionMeComponent implements OnInit {

    public pageNb: number;
    public haveMoreCollections: boolean;
    public loadingCollections: boolean;
    public isUpdatingPosition: boolean;
    public collections: IvCollection[];

    constructor(public authService: IvAuthService, private router: Router, private collectionService: IvCollectionService) {
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
        params.set('_author', this.authService.currentUser._id);
        params.set('custom_sort', 'true');
        this.collectionService.getCollections(params).subscribe(collections => {
            this.onCollectionsReceived(collections);
        }, () => {});
    }

    private onCollectionsReceived(collections){
        collections.sort(function(a, b){
            if(a.position < b.position) return -1;
            if(a.position > b.position) return 1;
            return 0;
        });
        for(let i in collections)
            this.collections.push(collections[i]);
        this.haveMoreCollections = (collections.length==IvDataLimit.COLLECTION);
        this.loadingCollections = false;
    }

    onCollectionMoved(event){
        this.isUpdatingPosition = true;
        this.collectionService.putCollection(event.value.modifiedItem).subscribe(collection => {
            this.isUpdatingPosition = false;
        }, (err) => {
            this.collections = [];
            this.pageNb = 0;
            this.loadCollections();
            this.isUpdatingPosition = false;
        });
    }
}
