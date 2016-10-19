import { Component, OnInit }   from '@angular/core';
import { IvAuthService }          from '../iv-auth/iv-auth.service';
import { Router } from '@angular/router';
import { URLSearchParams  }   from '@angular/http';
import { IvCollectionService }   from '../iv-collection/iv-collection.service';
import { IvCollection } from '../iv-collection/iv-collection.class';
import { IvLanguageService } from '../iv-language/iv-language.service';

@Component({
    templateUrl: './iv-dashboard.component.html',
    styleUrls: ['./iv-dashboard.component.scss']
})

export class IvDashboardComponent implements OnInit {

    public myCollections: IvCollection[];
    public myFavoriteCollections: IvCollection[];
    public isUpdatingPosition: boolean;

    constructor(public t: IvLanguageService, public authService: IvAuthService, private router: Router, private service: IvCollectionService) {
    }

    ngOnInit() {
        this.initMyCollections();
        this.initMyFavoriteCollections();
    }

    initMyCollections(){
        this.myCollections = [];
        let params = new URLSearchParams();
        params.set('populate', '_author+_thumbnail');
        params.set('custom_sort', 'true');
        params.set('limit', '7');
        params.set('_author', this.authService.currentUser._id);
        this.service.getCollections(params).subscribe(collections => {
            collections.sort(function(a, b){
                if(a.position < b.position) return -1;
                if(a.position > b.position) return 1;
                return 0;
            });
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

    onbCollectionCreated(event){
        if(event.value){
            this.router.navigate(['/c', event.value._id]);
        }
    }

    onCollectionMoved(event){
        this.isUpdatingPosition = true;
        this.service.putCollection(event.value.modifiedItem).subscribe(collection => {
            this.isUpdatingPosition = false;
        }, (err) => {
            this.initMyCollections();
            this.isUpdatingPosition = false;
        });
    }

}
