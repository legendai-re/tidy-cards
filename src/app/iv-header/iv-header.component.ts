import { Component, OnInit, OnDestroy,trigger, state, style, transition, animate }    from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { URLSearchParams  }     from '@angular/http';
import { SafeResourceUrl, DomSanitizationService } from '@angular/platform-browser';
import { ROUTER_DIRECTIVES }    from '@angular/router';
import { IvAuthService }        from '../iv-auth/iv-auth.service';
import { IvHeaderService }      from './iv-header.service';
import { IvLanguageService }    from '../iv-language/iv-language.service';
import { IvDataLimit }          from '../iv-shared/iv-data-limit.ts'
import { IvSearchHeaderComponent } from '../iv-search/iv-search-header.component';
import { IvSearchService }      from '../iv-search/iv-search.service';

@Component({
    selector: 'iv-header',
    templateUrl: './iv-header.component.html',
    styleUrls: ['./iv-header.component.scss'],
    directives: [ROUTER_DIRECTIVES, IvSearchHeaderComponent],
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
    public previousRoute: string;
    private headerSub: any;

    constructor(
        private _location: Location,
        public t: IvLanguageService,
        public sanitize: DomSanitizationService,
        public headerService: IvHeaderService,
        public searchService: IvSearchService,
        public authService: IvAuthService,
        public router: Router,
        public route: ActivatedRoute) {
        this.defaultColor = '6B5DFF';
        this.headerState = 'default';
        this.router.events.subscribe((route) => {
            this.setPreviousRoute(route);
            if(!this.isSearchPage(route))
                this.setDefault();
            else
                this.setSearchPage();
        })
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
            let tmpThis = this;
            setTimeout(() => {
                tmpThis.searchService.emitUpdateSearchQueryEvent({searchQuery: this.searchQuery});
            }, 200)
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

    private setPreviousRoute(routeEvent){
        if(!this.isSearchPage(routeEvent))
            this.previousRoute = routeEvent.url;
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
            this.router.navigate(['/search', {q: encodeURIComponent(this.searchQuery)}]);
        else
            this.router.navigate(['/search']);
    }

    public cancelSearch(){
        this.headerState = 'default';
        var toGo = typeof this.previousRoute == 'string' ? this.previousRoute :'/';
        this.router.navigate([toGo]);
    }

    public onSearchQueryChange(){
        this.updateUrl();
        this.searchService.emitUpdateSearchQueryEvent({searchQuery: this.searchQuery});
    }

    private updateUrl(){
        if(this.searchQuery && this.searchQuery != '')
            this._location.go('/search;q='+this.searchQuery);
        else
            this._location.go('/search');
    }

    ngOnDestroy() {
        this.headerSub.unsubscribe();
    }
}


