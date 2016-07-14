import { Http, Response,
         Headers,
         RequestOptions,
         URLSearchParams  }   from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable }       from 'rxjs/Observable';
import { Collection } from './collection.class';
import { ApiUrl }           from '../shared/api-url';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CollectionService {

  constructor (private http: Http) {}

  public getCollection (_id: string, params: URLSearchParams): Observable<Collection> {
    return this.http.get(ApiUrl.COLLECTIONS + '/' + _id, { search: params })
    .map(this.handleCollection)
    .catch(this.handleError);
  }

  public getCollections (params: URLSearchParams): Observable<Collection[]> {
    return this.http.get(ApiUrl.COLLECTIONS, { search: params })
    .map(this.handleCollections)
    .catch(this.handleError);
  }

  public postCollection (collection: Collection): Observable<Collection> {
    let body = JSON.stringify(collection);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(ApiUrl.COLLECTIONS, body, options)
    .map(this.handleCollection)
    .catch(this.handleError);
  }

  private handleCollections(res: Response) {
    let body = res.json();
    let cs = [];
    for (let key in body.data) {
      cs.push(Collection.createFormJson(body.data[key]));
    };
    return cs;
  }

  private handleCollection(res: Response) {
    let body = res.json();
    return Collection.createFormJson(body.data) || {};
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
