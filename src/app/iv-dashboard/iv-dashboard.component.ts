import { Component, OnInit, AfterViewInit }   from '@angular/core';
import { IvAuthService }          from '../iv-auth/iv-auth.service';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { URLSearchParams  }   from '@angular/http';
import { IvCollectionService }   from '../iv-collection/iv-collection.service';
import { IvCollectionCreateComponent }   from '../iv-collection/iv-collection-create/iv-collection-create.component';
import { IvCollectionCardComponent }   from '../iv-collection/iv-collection-card/iv-collection-card.component';
import { IvCollection }   from '../iv-collection/iv-collection.class';
declare var JQuery: any;

@Component({
    templateUrl: './iv-dashboard.component.html',
    styleUrls: ['./iv-dashboard.component.scss'],
    directives: [ROUTER_DIRECTIVES, IvCollectionCreateComponent, IvCollectionCardComponent]
})

export class IvDashboardComponent implements OnInit, AfterViewInit {

    public myCollections: IvCollection[];
    public myFavoriteCollections: IvCollection[];
    public isUpdatingPosition: boolean;

    constructor(public authService: IvAuthService, private router: Router, private service: IvCollectionService) {
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

    ngAfterViewInit(){
        let newIndex;
        let oldIndex;
        JQuery("#myCollectionContainer").sortable({
            handle: '.move-item-button',
            cancel: '.cancel-sort',
            start: (event, ui) => {
                 $(this).attr('data-previndex', ui.item.index());
            },
            update: (event, ui) => {
                newIndex = ui.item.index();
                oldIndex = $(this).attr('data-previndex');
                $(this).removeAttr('data-previndex');
            },
            stop: (event, ui) => {
                this.isUpdatingPosition = true;
                let tmpCollection = this.myCollections[oldIndex];
                tmpCollection.position = newIndex;
                tmpCollection.updatePosition = true;

                this.service.putCollection(tmpCollection).subscribe(collection => {
                    this.isUpdatingPosition = false;
                }, (err) => {
                    this.initMyCollections();
                    this.isUpdatingPosition = false;
                });

                this.myCollections.splice(oldIndex,1);
                this.myCollections.splice(newIndex, 0, tmpCollection);
                for(let i=0; i<this.myCollections.length; i++){
                        this.myCollections[i].position = i;
                }
            }
        }).disableSelection();
    }

}
