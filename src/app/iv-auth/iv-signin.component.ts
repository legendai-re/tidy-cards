import { Component }   from '@angular/core';
import { Router }      from '@angular/router';
import { IvAuthService } from './iv-auth.service';

@Component({
    templateUrl: './iv-signin.component.html'
})

export class IvSigninComponent {
    message: string;
    username: string;
    password: string;

    constructor(public authService: IvAuthService, public router: Router) {
    }

    onLoginSubmit() {
        this.message = 'Trying to log in ...';
        this.authService.login(this.username, this.password).then(success => {
            if (success) {
                this.router.navigate(['/']);
            }
        });
    }

    logout() {
        this.authService.logout();
    }
}
