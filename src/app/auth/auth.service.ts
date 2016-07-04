import { Injectable } 		from '@angular/core';
import { Http, Response, Headers, RequestOptions } 	from '@angular/http';
import { Observable } 		from 'rxjs/Observable';
import { User } 			from '../user/user.service';
// Statics
import 'rxjs/add/observable/throw';

// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {
	constructor (private http: Http) {}

  	isLoggedIn: boolean = false;
  	public currentUser: User = null;

  	private heroesUrl = 'auth/login';
  	
	postLogin (username: string, password: string): Observable<User> {
		let body = JSON.stringify({ username: username, password: password });
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		return this.http.post(this.heroesUrl, body, options)
		                .map(this.extractData)
		                .catch(this.handleError);
	}

	private extractData(res: Response) {
		let body = res.json();
		return body.data || { };
	}

	private handleError (error: any) {
		let errMsg = (error.message) ? error.message :
		error.status ? `${error.status} - ${error.statusText}` : 'Server error';
		console.error(errMsg);
		return Observable.throw(errMsg);
	}

	login (username: string, password: string) {
		return new Promise<Boolean>((resolve, reject) => { 
			this.postLogin(username, password).subscribe(user => {			
				this.currentUser = User.createFormJson(user);			
	            this.isLoggedIn = true;
	            resolve(true);    
	        },() => {
	            this.isLoggedIn = false;            
	            resolve(false); 
	        })      		
		});		
	}		

	logout() {
		this.isLoggedIn = false;
	}
}