import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Injectable }             from '@angular/core';
import { Observable }             from 'rxjs/Observable';
import { IvCollection }             from './tc-collection.class';
import { IvApiUrl }                 from '../tc-shared/tc-api-url';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class IvCollectionService {

    constructor (private http: Http) {}

    public getCollection (_id: string, params: URLSearchParams): Observable<IvCollection> {
        return this.http.get(IvApiUrl.COLLECTIONS + '/' + _id, { search: params })
        .map(this.handleCollection)
        .catch(this.handleError);
    }

    public getCollections (params: URLSearchParams): Observable<IvCollection[]> {
        return this.http.get(IvApiUrl.COLLECTIONS, { search: params })
        .map(this.handleCollections)
        .catch(this.handleError);
    }

    public postCollection (collection: IvCollection): Observable<IvCollection> {
        let body = JSON.stringify(collection);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(IvApiUrl.COLLECTIONS, body, options)
        .map(this.handleCollection)
        .catch(this.handleError);
    }

    public putCollection (collection: IvCollection): Observable<IvCollection> {
        let body = JSON.stringify(collection);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.put(IvApiUrl.COLLECTIONS + '/' + collection._id, body, options)
        .map(this.handleCollection)
        .catch(this.handleError);
    }

    public deleteCollection (_id: string): Observable<any> {
        return this.http.delete(IvApiUrl.COLLECTIONS + '/' + _id);
    }

    private handleCollections(res: Response) {
        let body = res.json();
        let cs = [];
        for (let key in body.data) {
            cs.push(IvCollection.createFormJson(body.data[key]));
        };
        return cs;
    }

    private handleCollection(res: Response) {
        let body = res.json();
        return IvCollection.createFormJson(body.data) || {};
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}
