import { Component, OnInit, OnDestroy }   from '@angular/core';
import { Router, ActivatedRoute }      from '@angular/router';
import { IvAuthService } from './iv-auth.service';
import { IvLanguageService } from '../iv-language/iv-language.service';

@Component({
    selector: 'iv-signin',
    templateUrl: './iv-signin.component.html',
    styleUrls: ['./iv-auth.component.scss']
})

export class IvSigninComponent implements OnInit, OnDestroy{

    public sub: any;
    public encodedNextUrl: string;
    public nextUrl: string;
    public username: string;
    public password: string;
    public loginFailed: boolean;
    public longinInProgress: boolean;
    public errorStatusCode: number;

    constructor(public t: IvLanguageService, private route: ActivatedRoute, public authService: IvAuthService, public router: Router) {
    }

    ngOnInit(){
        this.sub = this.route.params.subscribe(params => {
            this.encodedNextUrl = params['next'];
            this.nextUrl = decodeURIComponent(params['next']);
        });
    }

    onLoginSubmit() {
        this.longinInProgress = true;
        this.authService.login(this.username, this.password).then(result => {
            this.loginFailed = !result.success;
            if (result.success){
                let url = this.nextUrl != 'undefined' ? this.nextUrl : '/';
                this.router.navigate([url]);
            }else{
                this.errorStatusCode = result.error;
            }
            this.longinInProgress = false;
        });
    }

    public connectWith(strategy){
        var params = this.nextUrl != 'undefined' ? '?next='+this.encodedNextUrl : '?next=';
        window.location.href = 'auth/' + strategy + params;
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
