import { Component, OnInit }             from '@angular/core';
import { ROUTER_DIRECTIVES, Router }     from '@angular/router';
import { URLSearchParams  }              from '@angular/http';
import { CollectionService }             from './collection.service';
import { CollectionCreateComponent }     from './collection-create.component';
import { Collection }                    from './collection.class';

@Component({
    templateUrl: './collection-popular.component.html',
    directives: [ROUTER_DIRECTIVES]
})

export class CollectionPopularComponent implements OnInit {

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

    onSelect(collection: Collection) {
        this.router.navigate(['/c', collection._id]);
    }

}
