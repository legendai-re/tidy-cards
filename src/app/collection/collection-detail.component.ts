import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute }       from '@angular/router';
import { URLSearchParams  }   from '@angular/http';
import { CollectionService }from './collection.service';
import { Collection }from './collection.class';

@Component({
    templateUrl: './collection-detail.component.html'      
})

export class CollectionDetailComponent implements OnInit, OnDestroy  {
    collection: Collection;
    private sub: any;

    constructor( private route: ActivatedRoute, private router: Router, private service: CollectionService) {

    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            let id = params['collection_id'];            
            let getParams = new URLSearchParams();
            getParams.set('populate', '_author+_thumbnail');
            this.service.getCollection(id, getParams).subscribe((collection) => {
                this.collection = collection
            }, ()=>{})
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    goToCollections() { this.router.navigate(['/c/last']); }
}