import { Component, OnInit }               from '@angular/core';
import { Router, ActivatedRoute }          from '@angular/router';
import { URLSearchParams  }                from '@angular/http';
import { Title }                           from '@angular/platform-browser';
import { TcLanguageService }               from '../../tc-language/tc-language.service';
import { TcCollectionService }             from '../tc-collection.service';
import { TcCollection }                    from '../tc-collection.class';
import { TcDataLimit }                     from '../../tc-shared/tc-data-limit';
import { TcAuthService }                   from '../../tc-auth/tc-auth.service';
import { TcUserService }                   from '../../tc-user/tc-user.service';
import { TcUser }                          from '../../tc-user/tc-user.class';

@Component({
    templateUrl: './tc-collection-user-starred.component.html'
})

export class TcCollectionUserStarredComponent implements OnInit {

    public pageNb: number;
    public haveMoreCollections: boolean;
    public loadingCollections: boolean;
    public isUpdatingPosition: boolean;
    public isLoadingUser: boolean;
    public username: string;
    public user: TcUser;
    public collections: TcCollection[];
    public isCurrentUser: boolean;
    public sub: any;
    public authSub: any;

    constructor(
        public t: TcLanguageService,
        public authService: TcAuthService,
        private router: Router,
        private route: ActivatedRoute,
        private userService: TcUserService,
        private collectionService: TcCollectionService,
        private titleService: Title) {

        this.authSub = this.authService.getAuthInitializedEmitter().subscribe((value) => {
            if(this.authService.isLoggedIn && this.username === this.authService.currentUser.username){
                this.isCurrentUser = true;
                this.user = this.authService.currentUser;
                this.setTitle();
                this.loadCollections();
            }else{
                this.initUser(this.username)
            }
        })
    }

    ngOnInit() {
        this.pageNb = 0;
        this.loadingCollections = false;
        this.haveMoreCollections = true;
        this.isCurrentUser = false;
        this.collections = [];
        this.sub = this.route.params.subscribe(params => {
            this.username = params['username'];
            if(this.authService.authInitialized){
                if(this.authService.isLoggedIn && this.username === this.authService.currentUser.username){
                    this.isCurrentUser = true;
                    this.user = this.authService.currentUser;
                    this.setTitle();
                    this.loadCollections();
                }else{
                    this.initUser(this.username)
                }
            };
        });
    }

    private setTitle(){
        if(this.t.langInitialized){
            if(this.isCurrentUser)
                this.titleService.setTitle(this.t._.collection.my_favorite_title);
            else
                this.titleService.setTitle(this.t.format(this.t._.collection.favorite_by_title, [this.user.name]));
        }
    }

    public initUser(username){
        let getParams = new URLSearchParams();
        getParams.set('populate', '_avatar');
        this.isLoadingUser = true;
        this.userService.getUser(username, getParams).subscribe((user) => {
            this.user = user;
            this.isLoadingUser = false;
            this.setTitle();
            this.loadCollections();
        }, () => {
            this.isLoadingUser = false;
        });
    }

    public loadNextPage(){
        if(this.haveMoreCollections){
            this.pageNb++;
            this.loadCollections();
        }else{
            console.log('no more collections');
        }
    }

    private loadCollections(){
        this.loadingCollections = true;
        let params = new URLSearchParams();
        params.set('populate', '_author+_thumbnail');
        params.set('sort_field', 'createdAt');
        params.set('sort_dir', '-1');
        params.set('limit', TcDataLimit.COLLECTION.toString());
        params.set('skip', (TcDataLimit.COLLECTION * this.pageNb).toString());
        params.set('_starredBy', this.user._id);
        this.collectionService.getCollections(params).subscribe(collections => {
            this.onCollectionsReceived(collections);
        }, () => {});
    }

    private onCollectionsReceived(collections){
        collections.sort(function(a, b){
            if(a.position < b.position) return -1;
            if(a.position > b.position) return 1;
            return 0;
        });
        for(let i in collections)
            this.collections.push(collections[i]);
        this.haveMoreCollections = (collections.length==TcDataLimit.COLLECTION);
        this.loadingCollections = false;
    }

    onCollectionMoved(event){
        this.isUpdatingPosition = true;
        this.collectionService.putCollection(event.value.modifiedItem).subscribe(collection => {
            this.isUpdatingPosition = false;
        }, (err) => {
            this.collections = [];
            this.pageNb = 0;
            this.loadCollections();
            this.isUpdatingPosition = false;
        });
    }
}
