import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute }       from '@angular/router';
import { Http, Response, Headers, RequestOptions, URLSearchParams  } from '@angular/http';
import { Observable }             from 'rxjs/Observable';
import { IvApiUrl }                 from '../iv-shared/iv-api-url';


@Component({
    templateUrl: './iv-admin-home.component.html',
    styleUrls: ['./iv-admin-home.component.scss']
})

export class IvAdminHomeComponent {

    constructor (private http: Http) {}

    public generateCollectionAndItems(){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        this.http.post("api/dev/generate-content", "", options).subscribe((e) => {
            console.log('done');
        })
    }

    public deleteAllButUsers(){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        this.http.delete("api/dev/delete-all-but-users", options).subscribe((e) => {
            console.log('done');
        })
    }

}
