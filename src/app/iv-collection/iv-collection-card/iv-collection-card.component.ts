import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';
import { IvLanguageService } from '../../iv-language/iv-language.service';
import { IvAuthService } from '../../iv-auth/iv-auth.service';
import { IvStarService } from '../../iv-star/iv-star.service';
import { IvCollection } from '../iv-collection.class';
import { IvApiUrl } from '../../iv-shared/iv-api-url';

@Component({
    selector: 'iv-collection-card',
    templateUrl: 'iv-collection-card.component.html',
    styleUrls: ['iv-collection-card.component.scss'],
})

export class IvCollectionCardComponent implements OnInit{

    public isAuthor: boolean;
    private isWorking: boolean;

    @Input() collection: IvCollection;
    @Input() sortable: boolean;

    constructor(public t: IvLanguageService, private starService: IvStarService, private authService: IvAuthService, private http: Http) {
    }

    ngOnInit(){
        this.isWorking = false;
        this.isAuthor = (this.authService.isLoggedIn && this.authService.currentUser._id == this.collection._author._id);
    }

    public onStarCliked(){
        if(this.isAuthor || this.isWorking)
            return;
        if(!this.collection._star){
            this.addStarredCollection();
        }else{
            this.removeStarredCollection();
        }
    }

    private addStarredCollection(){
        this.isWorking = true;
        this.starService.postStar(this.collection).subscribe((star) => {
            this.collection._star = star;
            this.collection.starsCount++;
            this.isWorking = false;
        });
    }

    private removeStarredCollection(){
        this.starService.deleteStare(this.collection._star).subscribe((response) => {
            this.collection._star = null;
            this.collection.starsCount--;
            this.isWorking = false;
        })
    }

}
