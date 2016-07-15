import { Component, OnInit }   from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { URLSearchParams  }   from '@angular/http';
import { IvCollectionService }   from './iv-collection.service';
import { IvCollectionCreateComponent }   from './iv-collection-create.component';
import { IvCollectionCardComponent }   from './iv-collection-card.component';
import { IvCollection }   from './iv-collection.class';

@Component({
    templateUrl: './iv-collection-popular.component.html',
    directives: [ROUTER_DIRECTIVES, IvCollectionCardComponent]
})

export class IvCollectionPopularComponent implements OnInit {

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
