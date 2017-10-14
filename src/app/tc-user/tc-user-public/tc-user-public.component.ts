import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute }       from '@angular/router';
import { URLSearchParams  }             from '@angular/http';
import { TcAuthService }                from '../../tc-auth/tc-auth.service';
import { TcCollection }                 from '../../tc-collection/tc-collection.class';
import { TcCollectionService }          from '../../tc-collection/tc-collection.service';
import { TcUserService }                from '../tc-user.service';
import { TcUser }                       from '../tc-user.class';

@Component({
    selector: 'tc-public-profile',
    styleUrls: ['../tc-user.component.scss'],
    templateUrl: './tc-user-public.component.html'
})

export class TcUserPublicComponent implements OnInit, OnDestroy  {

    public userCollections: TcCollection[];
    public userStarredCollections: TcCollection[];
    public searchParams: string;
    public isLoadingUser: boolean;
    public user: TcUser;
    private sub: any;

    constructor(private collectionService: TcCollectionService, private userService: TcUserService, private route: ActivatedRoute, public authService: TcAuthService, public router: Router) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.searchParams = params['user_id'];
            let getParams = new URLSearchParams();
            getParams.set('populate', '_avatar');
            this.isLoadingUser = true;
            this.userService.getUser(this.searchParams, getParams).subscribe((user) => {
                this.user = user;
                this.isLoadingUser = false;
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