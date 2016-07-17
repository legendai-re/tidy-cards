import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Router, ActivatedRoute }       from '@angular/router';
import { Observable }             from 'rxjs/Observable';
import { IvCollectionService }            from './iv-collection.service';
import { IvCollection }                   from './iv-collection.class';
import { IvItemCreateComponent }          from '../iv-item/iv-item-create.component';


@Component({
    templateUrl: './iv-collection-detail.component.html',
    styleUrls: ['iv-collection-detail.component.scss'],
    directives: [IvItemCreateComponent]
})

export class IvCollectionDetailComponent implements OnInit, OnDestroy {
    public collection: IvCollection;
    private sub: any;

    constructor(private route: ActivatedRoute, private router: Router, private service: IvCollectionService) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            let id = params['collection_id'];
            let getParams = new URLSearchParams();
            getParams.set('populate', '_author+_thumbnail');
            this.service.getCollection(id, getParams).subscribe((collection) => {
                this.collection = collection;
            }, () => {});
        });
    }


    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
