import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { SafeResourceUrl, DomSanitizationService } from '@angular/platform-browser';
import { Injectable }             from '@angular/core';
import { Observable }             from 'rxjs/Observable';
import { IvItem }                 from './iv-item.class';
import { IvApiUrl }               from '../iv-shared/iv-api-url';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class IvItemService {

    constructor (private http: Http) {}

    /*public getCollection (_id: string, params: URLSearchParams): Observable<IvCollection> {
        return this.http.get(IvApiUrl.COLLECTIONS + '/' + _id, { search: params })
        .map(this.handleCollection)
        .catch(this.handleError);
    }*/

    public getItems (params: URLSearchParams): Observable<IvItem[]> {
        return this.http.get(IvApiUrl.ITEMS, { search: params })
        .map(this.handleItems)
        .catch(this.handleError);
    }

    public postItem (item: IvItem): Observable<IvItem> {
        let body = JSON.stringify(item);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(IvApiUrl.ITEMS, body, options)
        .map(this.handleItem)
        .catch(this.handleError);
    }

    private handleItems(res: Response) {
        let body = res.json();
        let cs = [];
        for (let key in body.data) {
            cs.push(IvItem.createFormJson(body.data[key]));
        };
        return cs;
    }

    private handleItem(res: Response) {
        let body = res.json();
        return IvItem.createFormJson(body.data) || {};
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}
