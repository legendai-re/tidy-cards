import { Component, OnInit }               from '@angular/core';
import { ROUTER_DIRECTIVES, Router }       from '@angular/router';
import { URLSearchParams  }                from '@angular/http';
import { IvCollectionService }               from '../iv-collection/iv-collection.service';
import { IvCollectionCardComponent }         from '../iv-collection/iv-collection-card.component';
import { IvCollection }                      from '../iv-collection/iv-collection.class';

@Component({
    templateUrl: './iv-discover.component.html',
    styleUrls: ['./iv-discover.component.scss'],
    directives: [ROUTER_DIRECTIVES, IvCollectionCardComponent]
})
export class IvDiscoverComponent implements OnInit {

    public collections: IvCollection[];

    constructor( private router: Router, private service: IvCollectionService) {
    }

    ngOnInit() {
        let params = new URLSearchParams();
        params.set('populate', '_author+_thumbnail');
        params.set('sort_field', 'createdAt');
        params.set('sort_dir', '-1');
        this.service.getCollections(params).subscribe(collections => {
            this.collections = collections;
        }, () => {});
    }
}
