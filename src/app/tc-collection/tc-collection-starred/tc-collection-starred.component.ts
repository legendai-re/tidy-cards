import { Component, OnInit }               from '@angular/core';
import { Router }       from '@angular/router';
import { URLSearchParams  }                from '@angular/http';
import { TcCollectionService }             from '../tc-collection.service';
import { TcCollection }                    from '../tc-collection.class';
import { TcDataLimit }                     from '../../tc-shared/tc-data-limit';
import { TcAuthService }                   from '../../tc-auth/tc-auth.service';

@Component({
    templateUrl: './tc-collection-starred.component.html'
})

export class TcCollectionStarredComponent implements OnInit {

    public pageNb: number;
    public haveMoreCollections: boolean;
    public loadingCollections: boolean;
    public isUpdatingPosition: boolean;
    public collections: TcCollection[];

    constructor(public authService: TcAuthService, private router: Router, private collectionService: TcCollectionService) {
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
        params.set('populate', '_author+_thumbnail');
        params.set('sort_field', 'createdAt');
        params.set('sort_dir', '-1');
        params.set('limit', TcDataLimit.COLLECTION.toString());
        params.set('skip', (TcDataLimit.COLLECTION * this.pageNb).toString());
        params.set('_starredBy', this.authService.currentUser._id);
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
        this.haveMoreCollections = (collections.length==TcDataLimit.COLLECTION);
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