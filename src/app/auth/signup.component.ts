import { Component }   from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService } from './auth.service';
import { User }        from '../user/user.service';

@Component({
  templateUrl: './signup.component.html'
})

export class SignupComponent {
    
    signupData = new class SignupData{
        username: string;
        email: string;
        password: string;
        passwordRepeat: string;
    }

    constructor(public authService: AuthService, public router: Router) {        
    }    

    onSignupSubmit() {
        var user = new User(
            undefined,
            this.signupData.username,
            this.signupData.username,
            this.signupData.email,
            this.signupData.password
        );
        this.authService.signup(user).then(success => {
            console.log(success);
        });
    }
    
}
