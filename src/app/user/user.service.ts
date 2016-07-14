import { Http, Response,
         Headers, RequestOptions,
         URLSearchParams  }           from '@angular/http';
    import { Injectable }             from '@angular/core';
    import { Observable }             from 'rxjs/Observable';
    import { User }                   from './user.class';
    import { ApiUrl }                 from '../shared/api-url';

    import 'rxjs/add/observable/throw';
    import 'rxjs/add/operator/catch';
    import 'rxjs/add/operator/debounceTime';
    import 'rxjs/add/operator/distinctUntilChanged';
    import 'rxjs/add/operator/map';
    import 'rxjs/add/operator/switchMap';
    import 'rxjs/add/operator/toPromise';

    @Injectable()
    export class UserService {

        constructor (private http: Http) {}

        public getUser (_id: string, params: URLSearchParams): Observable<User> {
            return this.http.get(ApiUrl.USERS + '/' + _id, { search: params })
            .map(this.handleUser)
            .catch(this.handleError);
        }

        private handleUsers(res: Response) {
            let body = res.json();
            let cs = [];
            for (let key in body.data) {
                cs.push(User.createFormJson(body.data[key]));
            }
            return cs;
        }

        private handleUser(res: Response) {
            let body = res.json();
            return User.createFormJson(body.data) || {};
        }

        private handleError (error: any) {
            let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
            console.error(errMsg);
            return Observable.throw(errMsg);
        }

    }
