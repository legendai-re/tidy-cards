import { Component, OnInit, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute }       from '@angular/router';
import { URLSearchParams  }             from '@angular/http';
import { IvAuthService }                from '../../iv-auth/iv-auth.service';
import { IvCollection }                 from '../../iv-collection/iv-collection.class';
import { IvCollectionCardComponent }    from '../../iv-collection/iv-collection-card/iv-collection-card.component';
import { IvCollectionService }          from '../../iv-collection/iv-collection.service';
import { IvUserService }                from '../iv-user.service';
import { IvUser }                       from '../iv-user.class';

@Component({
    selector: 'iv-public-profile',
    styleUrls: ['../iv-user.component.scss'],
    templateUrl: './iv-user-public.component.html',
    directives: [ROUTER_DIRECTIVES, IvCollectionCardComponent]
})

export class IvUserPublicComponent implements OnInit, OnDestroy  {

    public userCollections: IvCollection[];
    public userStarredCollections: IvCollection[];
    public user: IvUser;
    private sub: any;


    constructor(private collectionService: IvCollectionService, private userService: IvUserService, private route: ActivatedRoute, public authService: IvAuthService, public router: Router) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            let userId = params['user_id'];
            let getParams = new URLSearchParams();
            getParams.set('populate', '_avatar');
            this.userService.getUser(userId, getParams).subscribe((user) => {
                this.user = user;
                this.initUserCollections();
                this.initUserStarredCollections();
            }, () => {});
        });
    }

    private initUserCollections(){
        let params = new URLSearchParams();
        params.set('populate', '_author+_thumbnail');
        params.set('sort_field', 'createdAt');
        params.set('sort_dir', '-1');
        params.set('limit', '8');
        params.set('_author', this.user._id);
        this.collectionService.getCollections(params).subscribe(collections => {
            this.userCollections = collections;
        }, () => {});
    }

    private initUserStarredCollections(){
        let params = new URLSearchParams();
        params.set('populate', '_author+_thumbnail');
        params.set('sort_field', 'createdAt');
        params.set('sort_dir', '-1');
        params.set('limit', '8');
        params.set('_starredBy', this.user._id);
        this.collectionService.getCollections(params).subscribe(collections => {
            this.userStarredCollections = collections;
        }, () => {});
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
