import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { URLSearchParams  }     from '@angular/http';
import { IvHeaderService }      from '../tc-header/tc-header.service';
import { IvCollection }         from '../tc-collection/tc-collection.class';
import { IvCollectionService }  from '../tc-collection/tc-collection.service';
import { IvUser }               from '../tc-user/tc-user.class';
import { IvUserService }        from '../tc-user/tc-user.service';
import { IvDataLimit }          from '../tc-shared/tc-data-limit';
import { IvSearchService }      from './tc-search.service';

@Component({
    selector: 'tc-search-header',
    templateUrl: './tc-search-header.component.html',
    styleUrls: ['./tc-search-header.component.scss']
})

export class IvSearchHeaderComponent implements OnInit, OnDestroy {

    public emittedSearchQuery: string;
    public searchQuery: string;
    public users: IvUser[];
    public usersPageNb: number;
    public isLoadingUsers: boolean;
    public collections: IvCollection[];
    public collectionsPageNb: number;
    public isLoadingCollections: boolean;
    public requestTime: Date;
    private searchSub: any;

    constructor(
        private searchService: IvSearchService,
        private userService: IvUserService,
        private collectionService: IvCollectionService,
        public route: ActivatedRoute,
        public headerService: IvHeaderService,
        public router: Router) {

    }

    ngOnInit(){
        this.resetResult();
        this.searchSub = this.searchService.getUpdateSearchQueryEmitter().subscribe((value) => {
            this.resetResult();
            this.searchQuery = value.searchQuery;
            this.search();
        });
    }

    public resetResult(){
        this.collectionsPageNb = 0;
        this.collections = [];
        this.usersPageNb = 0;
        this.users = [];
    }

    public search(){
        if(!this.searchQuery || this.searchQuery == '')
            return;
        this.searchCollections();
        this.searchUsers();
    }

    public searchCollections(){
        this.isLoadingCollections = true;
        let params = new URLSearchParams();
        params.set('limit', IvDataLimit.COLLECTION.toString());
        params.set('skip', (IvDataLimit.COLLECTION * this.collectionsPageNb).toString());
        params.set('sort_field', 'createdAt');
        params.set('sort_dir', '-1');
        params.set('search', encodeURIComponent(this.searchQuery));
        this.collectionService.getCollections(params).subscribe(collections => {
            if(this.collectionsPageNb == 0)
                this.collections = collections;
            else{
                for(let i in collections)
                    this.collections.push(collections[i]);
            }
            this.isLoadingCollections = false;
        }, () => {});
    }

    public searchUsers(){
        this.isLoadingUsers = true;
        let params = new URLSearchParams();
        params.set('limit', IvDataLimit.COLLECTION.toString());
        params.set('skip', (IvDataLimit.COLLECTION * this.usersPageNb).toString());
        params.set('populate', '_avatar');
        params.set('sort_field', 'createdAt');
        params.set('sort_dir', '-1');
        params.set('search', encodeURIComponent(this.searchQuery));
        this.userService.getUsers(params).subscribe(users => {
            if(this.usersPageNb == 0)
                this.users = users;
            else{
                for(let i in users)
                    this.users.push(users[i]);
            }
            this.isLoadingUsers = false;
        }, () => {});
    }

    ngOnDestroy() {
        this.searchSub.unsubscribe();
    }
}
