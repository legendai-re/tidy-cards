import { Component, OnInit }   from '@angular/core';
import { ROUTER_DIRECTIVES, Router }      from '@angular/router';
import { IvAuthService } from './iv-auth.service';

@Component({
    selector: 'iv-signin',
    templateUrl: './iv-signin.component.html',
    directives: [ROUTER_DIRECTIVES]
})

export class IvSigninComponent implements OnInit{

    public username: string;
    public password: string;

    constructor(public authService: IvAuthService, public router: Router) {
    }

    ngOnInit(){
    }

    onLoginSubmit() {
        this.authService.login(this.username, this.password).then(success => {
            if (success) {
                this.router.navigate(['/']);
            }
        });
    }

}
