import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';
import { IvHeaderService } from '../iv-header/iv-header.service';

@Component({
    templateUrl: './iv-search.component.html',
    directives: [ROUTER_DIRECTIVES]
})

export class IvSearchComponent implements OnInit, OnDestroy {

    private sub: any;

    constructor(public route: ActivatedRoute, public headerService: IvHeaderService, public router: Router) {

    }

    ngOnInit(){
        this.sub = this.route.params.subscribe(params => {
            var searchQuery = params['q'];
            this.headerService.emitUpdateHeaderEvent({
                value:{
                    type: 'SEARCH',
                    searchQuery: searchQuery
                }
            });
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
