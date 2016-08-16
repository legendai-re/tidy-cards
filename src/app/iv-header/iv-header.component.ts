import { Component, OnInit, OnDestroy }    from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { URLSearchParams  }     from '@angular/http';
import { SafeResourceUrl, DomSanitizationService } from '@angular/platform-browser';
import { IvAuthService }        from '../iv-auth/iv-auth.service';
import { IvHeaderService }      from './iv-header.service';
import { IvLanguageService }    from '../iv-language/iv-language.service';
import { IvDataLimit }          from '../iv-shared/iv-data-limit.ts'
import { IvSearchService }      from '../iv-search/iv-search.service';

@Component({
    selector: 'iv-header',
    templateUrl: './iv-header.component.html',
    styleUrls: ['./iv-header.component.scss']
})
export class IvHeaderComponent implements OnInit, OnDestroy{

    public searchQuery: string;
    public lastSearchQuery: string;
    public type: string;
    public color: string;
    public image: any;
    public title: string;
    public noHeader: boolean;
    public headerState: string;
    public defaultColor: string;
    public previousRoute: string;
    public typingQueryTimer;
    public doneTypingQueryInterval: number;
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
        this.doneTypingQueryInterval = 250;
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
            console.log(event)
            let tmpThis = this;
            setTimeout(() => {
                this.searchQuery = event.value.searchQuery;
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
        return routeEvent.url.split('/')[1] == 'search';
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
            this.router.navigate(['/search', this.searchQuery]);
        else
            this.router.navigate(['/search']);
    }

    public cancelSearch(){
        this.headerState = 'default';
        var toGo = typeof this.previousRoute == 'string' ? this.previousRoute :'/';
        this.router.navigate([toGo]);
    }

    public onQueryKeyUp(){
        this.updateUrl();
        clearTimeout(this.typingQueryTimer);
        new Promise((resolve, reject) => {
            this.typingQueryTimer = setTimeout(()=>{resolve(true);}, this.doneTypingQueryInterval);
        }).then((e)=>{
            this.onSearchQueryChange();
        })
    }

    public onQueryKeyDown(){
        clearTimeout(this.typingQueryTimer);
    }

    public onSearchQueryChange(){
        if(this.lastSearchQuery == this.searchQuery)
            return;
        this.lastSearchQuery = this.searchQuery;
        this.searchService.emitUpdateSearchQueryEvent({searchQuery: this.searchQuery});
    }

    private updateUrl(){
        if(this.searchQuery && this.searchQuery != '')
            this._location.go('/search/'+encodeURIComponent(this.searchQuery));
        else
            this._location.go('/search');
    }

    ngOnDestroy() {
        this.headerSub.unsubscribe();
    }
}


