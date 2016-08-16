import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { URLSearchParams  }     from '@angular/http';
import { IvHeaderService }      from '../iv-header/iv-header.service';

@Component({
    templateUrl: './iv-search.component.html'
})

export class IvSearchComponent implements OnInit, OnDestroy {

    private sub: any;

    constructor(
        public route: ActivatedRoute,
        public headerService: IvHeaderService) {
    }

    ngOnInit(){
        this.sub = this.route.params.subscribe(params => {
            if(params['q']){
                this.headerService.emitUpdateHeaderEvent({value: {type: 'SEARCH', searchQuery: params['q']}})
            }
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
