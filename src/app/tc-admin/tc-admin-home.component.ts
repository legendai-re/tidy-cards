import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Response, Headers, RequestOptions, URLSearchParams  } from '@angular/http';
import { Observable }             from 'rxjs/Observable';
import { IvApiUrl }                 from '../tc-shared/tc-api-url';


@Component({
    templateUrl: './tc-admin-home.component.html',
    styleUrls: ['./tc-admin-home.component.scss']
})

export class IvAdminHomeComponent {

    public collectionNb: number;
    public userNb: number;
    public isWorking: boolean;

    constructor (private http: Http) {
        this.collectionNb = 500;
        this.userNb = 10;
        this.isWorking = false;
    }

    public generateCollectionAndItems(){
        this.isWorking = true;
        let body = JSON.stringify({collectionNb: this.collectionNb, userNb: this.userNb});
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        this.http.post("api/dev/generate-content", body, options).subscribe((e) => {
            console.log('done');
            this.isWorking = false;
        })
    }

    public deleteAllButUsers(){
        this.isWorking = true;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        this.http.delete("api/dev/delete-all-but-users", options).subscribe((e) => {
            console.log('done');
            this.isWorking = false;
        })
    }

}
