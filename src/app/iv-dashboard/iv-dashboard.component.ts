import { Component, OnInit }   from '@angular/core';
import { IvAuthService }          from '../iv-auth/iv-auth.service';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { URLSearchParams  }   from '@angular/http';
import { IvCollectionService }   from '../iv-collection/iv-collection.service';
import { IvCollectionCreateComponent }   from '../iv-collection/iv-collection-create/iv-collection-create.component';
import { IvCollectionCardComponent }   from '../iv-collection/iv-collection-card/iv-collection-card.component';
import { IvCollection }   from '../iv-collection/iv-collection.class';

@Component({
    templateUrl: './iv-dashboard.component.html',
    styleUrls: ['./iv-dashboard.component.scss'],
    directives: [ROUTER_DIRECTIVES, IvCollectionCreateComponent, IvCollectionCardComponent]
})

export class IvDashboardComponent implements OnInit {

    public myCollections: IvCollection[];
    public myFavoriteCollections: IvCollection[];

    constructor(public authService: IvAuthService, private router: Router, private service: IvCollectionService) {
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
