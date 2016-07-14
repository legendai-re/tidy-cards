import { Component, OnInit }               from '@angular/core';
import { ROUTER_DIRECTIVES, Router }       from '@angular/router';
import { URLSearchParams  }                from '@angular/http';
import { CollectionService }               from './collection.service';
import { CollectionCardComponent }         from './collection-card.component';
import { Collection }                      from './collection.class';

@Component({
    templateUrl: './collection-last.component.html',
    directives: [ROUTER_DIRECTIVES, CollectionCardComponent]
})

export class CollectionLastComponent implements OnInit {

    public collections: Collection[];

    constructor( private router: Router, private service: CollectionService) {
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
