import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Injectable }             from '@angular/core';
import { Observable }             from 'rxjs/Observable';
import { IvStar }                 from './iv-star.class';
import { IvCollection }           from '../iv-collection/iv-collection.class';
import { IvApiUrl }               from '../iv-shared/iv-api-url';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class IvStarService {

    constructor (private http: Http) {}

    public postStar (collection: IvCollection): Observable<IvStar> {
        let body = JSON.stringify({_collection: collection._id});
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(IvApiUrl.STAR, body, options)
        .map(this.handleStar)
        .catch(this.handleError);
    }

    public deleteStare (star: IvStar): Observable<any> {
        return this.http.delete(IvApiUrl.STAR + '/' + star._id);
    }

    private handleStar(res: Response) {
        let body = res.json();
        return IvStar.createFormJson(body.data) || {};
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}
