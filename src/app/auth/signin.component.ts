import { Component }   from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService } from './auth.service';

@Component({
    templateUrl: './signin.component.html'
})

export class SigninComponent {
    message: string;
    username: string;
    password: string;

    constructor(public authService: AuthService, public router: Router) {
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
