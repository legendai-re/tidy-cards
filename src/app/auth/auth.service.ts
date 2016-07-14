import { Injectable }       from '@angular/core';
import { Router }           from '@angular/router';
import { Http, Response, Headers, RequestOptions }   from '@angular/http';
import { Observable }       from 'rxjs/Observable';
import { User }             from '../user/user.class';
import { ApiUrl }           from '../shared/api-url';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {
    constructor (private http: Http, private router: Router) {}

    authInitialized: boolean = false;
    isLoggedIn: boolean = false;
    currentUser: User = null;

    private postLogin (username: string, password: string): Observable<User> {
        let body = JSON.stringify({ username: username, password: password });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(ApiUrl.LOGIN, body, options)
        .map(this.handleUser)
        .catch(this.handleError);
    }

    private postSignup (user: User): Observable<User> {
        let body = JSON.stringify(user);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(ApiUrl.SIGNUP, body, options)
        .map(this.handleUser)
        .catch(this.handleError);
    }

    private getCurrentUser (): Observable<User> {
        return this.http.get(ApiUrl.CURRENT_USER)
        .map(this.handleUser)
        .catch(this.handleError);
    }

    private getLogout (): Observable<Boolean> {
        return this.http.get(ApiUrl.LOGOUT)
        .map(this.handleUser)
        .catch(this.handleError);
    }

    private handleUser(res: Response) {
        let body = res.json();
        return body.data ? User.createFormJson(body.data) : { };
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    login (username: string, password: string): Promise<Boolean> {
        return new Promise<Boolean>((resolve, reject) => {
            this.postLogin(username, password).subscribe(user => {
                this.currentUser = user;
                this.isLoggedIn = true;
                resolve(true);
            }, () => {
                this.isLoggedIn = false;
                resolve(false);
            });
        });
    }

    signup (user: User): Promise<Boolean> {
        return new Promise<Boolean>((resolve, reject) => {
            this.postSignup(user).subscribe(user => {
                this.currentUser = user;
                this.isLoggedIn = true;
                resolve(true);
            }, () => {
                this.isLoggedIn = false;
                resolve(false);
            });
        });
    }

    initCurrentUser(): Promise<Boolean> {
        return new Promise<Boolean>((resolve, reject) => {
            this.getCurrentUser().subscribe(user => {
                this.currentUser = user;
                this.isLoggedIn = true;
                this.authInitialized = true;
                resolve(true);
            }, () => {
                this.isLoggedIn = false;
                this.authInitialized = true;
                resolve(false);
            });
        });
    }

    logout(): void {
        this.getLogout().subscribe(success => {
            this.isLoggedIn = false;
            this.currentUser = null;
            this.router.navigate(['/']);
        });
    }
}
