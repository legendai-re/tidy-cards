import { Component, OnInit, OnDestroy,trigger, state, style, transition, animate }    from '@angular/core';
import {Location} from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { URLSearchParams  }     from '@angular/http';
import { SafeResourceUrl, DomSanitizationService } from '@angular/platform-browser';
import { ROUTER_DIRECTIVES }    from '@angular/router';
import { IvAuthService }        from '../iv-auth/iv-auth.service';
import { IvHeaderService }      from './iv-header.service';
import { IvLanguageService }    from '../iv-language/iv-language.service';
import { IvCollection }         from '../iv-collection/iv-collection.class';
import { IvCollectionService }  from '../iv-collection/iv-collection.service';
import { IvCollectionCardComponent } from '../iv-collection/iv-collection-card/iv-collection-card.component';
import { IvUser }               from '../iv-user/iv-user.class';
import { IvUserService }        from '../iv-user/iv-user.service';
import { IvDataLimit }          from '../iv-shared/iv-data-limit.ts'

@Component({
    selector: 'iv-header',
    templateUrl: './iv-header.component.html',
    styleUrls: ['./iv-header.component.scss'],
    directives: [ROUTER_DIRECTIVES, IvCollectionCardComponent],
    animations: [
    trigger('headerState', [
        state('default', style({
            minHeight: '260px'
        })),
        state('search',   style({
            minHeight: '2000px'
        })),
        transition('default => search', animate('300ms ease-in')),
        transition('search => default', animate('300ms ease-out'))
        ])
    ]
})
export class IvHeaderComponent implements OnInit, OnDestroy{

    public searchQuery: string;
    public type: string;
    public color: string;
    public image: any;
    public title: string;
    public noHeader: boolean;
    public headerState: string;
    public defaultColor: string;
    public users: IvUser[];
    public usersPageNb: number;
    public collections: IvCollection[];
    public collectionsPageNb: number;
    private headerSub: any;

    constructor(
        private userService: IvUserService,
        private collectionService: IvCollectionService,
        private _location: Location,
        public t: IvLanguageService,
        public sanitize: DomSanitizationService,
        public headerService: IvHeaderService,
        public authService: IvAuthService,
        public router: Router,
        public route: ActivatedRoute) {
        this.defaultColor = '6B5DFF';
        this.router.events.subscribe((route) => {
            if(!this.isSearchPage(route))
                this.setDefault();
            else
                this.setSearchPage();
        })
        this.headerState = 'default';
    }

    ngOnInit() {
        this.headerSub = this.headerService.getUpdateHeaderEmitter().subscribe((value) => {
            this.updateHeader(value);
        });
    }

    private updateHeader(event){
        if(event.value.type === 'DEFAULT'){
            this.setDefault();
        }else if(event.value.type === 'SEARCH'){
            this.setSearchPage();
            this.searchQuery = event.value.searchQuery;
            this.onSearchQueryChange();
        }else if(event.value.type === 'NO_HEADER'){
            this.noHeader = true;
        }else{
            this.type = event.value.type;
            this.color = event.value.color;
            this.image = event.value.image;
            this.title = event.value.title;
        }
    }

    private setDefault(){
        this.headerState = 'default';
        this.noHeader = false;
        this.color = this.defaultColor;
        this.image = null;
        this.title = '';
    }

    private isSearchPage(routeEvent){
        return routeEvent.url.split(';')[0] == '/search';
    }

    private setSearchPage(){
        this.headerState = 'search';
        this.noHeader = false;
        this.color = this.defaultColor;
        this.image = null;
        this.title = '';
    }

    public searchIntent(){
        if(this.headerState === 'search')
            return;
        this.headerState = 'search';
        if(this.searchQuery && this.searchQuery != '')
            this.router.navigate(['/search', {q: this.searchQuery}]);
        else
            this.router.navigate(['/search']);
    }

    public cancelSearch(){
        this.headerState = 'default';
        this._location.back();
    }

    public onSearchQueryChange(){
        this.collectionsPageNb = 0;
        this.collections = [];
        this.usersPageNb = 0;
        this.users = [];
        if(!this.searchQuery || this.searchQuery == '')
            return;
        this.searchCollections();
        this.searchUsers();
    }

    public searchCollections(){
        let params = new URLSearchParams();
        params.set('limit', IvDataLimit.COLLECTION.toString());
        params.set('skip', (IvDataLimit.COLLECTION * this.collectionsPageNb).toString());
        params.set('sort_field', 'createdAt');
        params.set('sort_dir', '-1');
        params.set('search', encodeURIComponent(this.searchQuery));
        this.collectionService.getCollections(params).subscribe(collections => {
            for(let i in collections)
                this.collections.push(collections[i]);
        }, () => {});
    }

    public searchUsers(){
        let params = new URLSearchParams();
        params.set('limit', IvDataLimit.COLLECTION.toString());
        params.set('skip', (IvDataLimit.COLLECTION * this.usersPageNb).toString());
        params.set('populate', '_avatar');
        params.set('sort_field', 'createdAt');
        params.set('sort_dir', '-1');
        params.set('search', encodeURIComponent(this.searchQuery));
        this.userService.getUsers(params).subscribe(users => {
            for(let i in users)
                this.users.push(users[i]);
        }, () => {});
    }

    ngOnDestroy() {
        this.headerSub.unsubscribe();
    }
}


