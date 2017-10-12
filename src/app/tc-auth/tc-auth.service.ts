import { Injectable, EventEmitter }       from '@angular/core';
import { Router }           from '@angular/router';
import { Http, Response, Headers, RequestOptions }   from '@angular/http';
import { Observable }       from 'rxjs/Observable';
import { IvUser }           from '../tc-user/tc-user.class';
import { IvApiUrl }           from '../tc-shared/tc-api-url';
import { IvLanguageService }  from '../tc-language/tc-language.service';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class IvAuthService {

    authInitializedEmitter: any;
    authInitialized: boolean = false;
    isLoggedIn: boolean = false;
    currentUser: IvUser = null;

    constructor (private languageService: IvLanguageService, private http: Http, private router: Router) {
        this.authInitializedEmitter = new EventEmitter();
    }

    private postLogin (username: string, password: string): Observable<IvUser> {
        let body = JSON.stringify({ username: username, password: password });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(IvApiUrl.LOGIN, body, options)
        .map(this.handleUser)
        .catch(this.handleError);
    }

    private postSignup (user: IvUser): Observable<IvUser> {
        let body = JSON.stringify(user);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(IvApiUrl.SIGNUP, body, options)
        .map(this.handleUser)
        .catch(this.handleError);
    }

    public putPasswordUpdate (userId: string, password: string, newPassword: string): Observable<any> {
        let body = JSON.stringify({user_id: userId, password: password, newPassword: newPassword});
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.put(IvApiUrl.PASSWORD_UPDATE, body, options)
        .map((res) => {return res.json()})
        .catch(this.handleError);
    }

    private getCurrentUser (): Observable<IvUser> {
        return this.http.get(IvApiUrl.CURRENT_USER)
        .map(this.handleUser)
        .catch(this.handleError);
    }

    private getLogout (): Observable<Boolean> {
        return this.http.get(IvApiUrl.LOGOUT)
        .map(this.handleUser)
        .catch(this.handleError);
    }

    private handleUser(res: Response) {
        let body = res.json();
        return body.data ? IvUser.createFormJson(body.data) : { };
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(error.status);
    }

    public putUnlink (type: string): Observable<Boolean> {
        let body = JSON.stringify({type: type});
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.put(IvApiUrl.UNLINK, body, options)
            .map((res) => {return true})
            .catch(this.handleError);
    }

    public getAuthInitializedEmitter() {
        return this.authInitializedEmitter;
    }

    public login (username: string, password: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.postLogin(username, password).subscribe(user => {
                this.currentUser = user;
                this.isLoggedIn = true;
                this.languageService.loadLanguage(user);
                resolve({success: true});
            }, (err) => {
                this.isLoggedIn = false;
                resolve({success: false, error: err});
            });
        });
    }

    public signup (user: IvUser): Promise<Boolean> {
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

    public initCurrentUser(): Promise<Boolean> {
        return new Promise<Boolean>((resolve, reject) => {
            this.getCurrentUser().subscribe(user => {
                if(user._id){
                    this.currentUser = user;
                    this.isLoggedIn = true;
                    this.authInitialized = true;
                    resolve(true);
                }else{
                    this.isLoggedIn = false;
                    this.authInitialized = true;
                    resolve(false);
                }
                this.languageService.loadLanguage(user);
                this.authInitializedEmitter.emit({sucess: this.isLoggedIn});
            });
        });
    }

    public logout(): void {
        this.getLogout().subscribe(success => {
            this.isLoggedIn = false;
            this.currentUser = null;
            this.languageService.loadLanguage(null);
            this.router.navigate(['/']);
        });
    }
}
