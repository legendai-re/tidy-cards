import { Component, OnInit }   from '@angular/core';
import { ROUTER_DIRECTIVES, Router }      from '@angular/router';
import { IvAuthService } from './iv-auth.service';

@Component({
    selector: 'iv-signin',
    templateUrl: './iv-signin.component.html',
    styleUrls: ['./iv-auth.component.scss'],
    directives: [ROUTER_DIRECTIVES]
})

export class IvSigninComponent implements OnInit{

    public username: string;
    public password: string;
    public loginFailed: boolean;
    public longinInProgress: boolean;
    public errorStatusCode: number;

    constructor(public authService: IvAuthService, public router: Router) {
    }

    ngOnInit(){
    }

    onLoginSubmit() {
        this.longinInProgress = true;
        this.authService.login(this.username, this.password).then(result => {
            this.loginFailed = !result.success;
            if (result.success)
                this.router.navigate(['/']);
            else
                this.errorStatusCode = result.error;
            this.longinInProgress = false;
        });
    }

}
