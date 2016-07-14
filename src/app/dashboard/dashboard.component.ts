import { Component, OnInit }   from '@angular/core';
import { AuthService }          from '../auth/auth.service';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { URLSearchParams  }   from '@angular/http';
import { CollectionService }   from '../collection/collection.service';
import { CollectionCreateComponent }   from '../collection/collection-create.component';
import { CollectionCardComponent }   from '../collection/collection-card.component';
import { Collection }   from '../collection/collection.class';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    directives: [ROUTER_DIRECTIVES, CollectionCreateComponent, CollectionCardComponent]
})

export class DashboardComponent implements OnInit {

    public myCollections: Collection[];
    public myFavoriteCollections: Collection[];

    constructor(public authService: AuthService, private router: Router, private service: CollectionService) {
    }

    ngOnInit() {
        this.initMyCollections();
        this.initMyFavoriteCollections();
    }

    initMyCollections(){
        let params = new URLSearchParams();
        params.set('populate', '_author+_thumbnail');
        params.set('sort_field', 'createdAt');
        params.set('sort_dir', '-1');
        params.set('limit', '7');
        params.set('_author', this.authService.currentUser._id);
        this.service.getCollections(params).subscribe(collections => {
            this.myCollections = collections;
        }, () => {});
    }

    initMyFavoriteCollections(){
        let params = new URLSearchParams();
        params.set('populate', '_author+_thumbnail');
        params.set('sort_field', 'createdAt');
        params.set('sort_dir', '-1');
        params.set('limit', '8');
        params.set('_starredBy', this.authService.currentUser._id);
        this.service.getCollections(params).subscribe(collections => {
            this.myFavoriteCollections = collections;
        }, () => {});
    }

}
