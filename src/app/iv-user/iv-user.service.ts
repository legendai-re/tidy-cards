import { Http, Response, Headers, RequestOptions, URLSearchParams  } from '@angular/http';
import { Injectable }             from '@angular/core';
import { Observable }             from 'rxjs/Observable';
import { IvUser }                   from './iv-user.class';
import { IvApiUrl }                 from '../iv-shared/iv-api-url';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class IvUserService {

    constructor (private http: Http) {}

    public getUser(_id: string, params: URLSearchParams): Observable<IvUser> {
        return this.http.get(IvApiUrl.USERS + '/' + _id, { search: params })
            .map(this.handleUser)
            .catch(this.handleError);
    }

    public putUser(user: IvUser): Observable<IvUser> {
        let body = JSON.stringify(user);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.put(IvApiUrl.USERS + '/' + user._id, body, options)
            .map(this.handleUser)
            .catch(this.handleError);
    }

    public getValidUsername(username: string): Observable<boolean>{
        let params = new URLSearchParams();
        params.set('username', username);
        return this.http.get(IvApiUrl.VALID_USERNAME, { search: params })
            .map(this.handleValidUsername)
            .catch(this.handleError);
    }

    private handleUsers(res: Response) {
        let body = res.json();
        let cs = [];
        for (let key in body.data) {
            cs.push(IvUser.createFormJson(body.data[key]));
        }
        return cs;
    }

    private handleUser(res: Response) {
        let body = res.json();
        return IvUser.createFormJson(body.data) || {};
    }

    private handleValidUsername(res: Response){
        let body = res.json();
        return body.data.isValid;
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}
