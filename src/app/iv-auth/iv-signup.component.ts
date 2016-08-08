import { Component }   from '@angular/core';
import { ROUTER_DIRECTIVES, Router }      from '@angular/router';
import { IvAuthService } from './iv-auth.service';
import { IvUser }        from '../iv-user/iv-user.class';
import { IvUserService } from '../iv-user/iv-user.service';

@Component({
    selector: 'iv-signup',
    templateUrl: './iv-signup.component.html',
    styleUrls: ['./iv-auth.component.scss'],
    directives: [ROUTER_DIRECTIVES]
})

export class IvSignupComponent {

    public usernameState: string;
    public validatingUsername: boolean;

    public passWordValid: boolean;

    private typingUsernameTimer;
    private doneTypingUsernameInterval: number;

    signupData = new class SignupData{
        username: string;
        email: string;
        password: string;
        passwordRepeat: string;
    };

    constructor(private userService: IvUserService, public authService: IvAuthService, public router: Router) {
        this.doneTypingUsernameInterval = 1000;
    }

    public onUsernameKeyUp(){
        this.usernameState = IvUser.isValidUsername(this.signupData.username) ? 'VALIDATING' : 'INVALID';
        clearTimeout(this.typingUsernameTimer);
        new Promise((resolve, reject) => {
            this.typingUsernameTimer = setTimeout(()=>{resolve(true);}, this.doneTypingUsernameInterval);
        }).then((e)=>{
            this.checkUsername();
        })
    }

    public onUsernameKeyDown(){
        clearTimeout(this.typingUsernameTimer);
    }

    public checkUsername(){
        if(!IvUser.isValidUsername(this.signupData.username))
            return;
        this.userService.getValidUsername(this.signupData.username).subscribe((isValid) => {
            this.usernameState = isValid ? 'FREE' : 'TAKEN';
            this.validatingUsername = false;
        })
    }

    public isFormValid(){
        return  this.usernameState == 'FREE' &&
                this.signupData.password &&
                this.signupData.password.length > 3 &&
                this.signupData.password === this.signupData.passwordRepeat;
    }

    onSignupSubmit() {
        if(!this.isFormValid())
            return;
        let user = new IvUser(
            undefined,
            undefined,
            undefined,
            this.signupData.username,
            this.signupData.username,
            this.signupData.email,
            this.signupData.password
            );
        this.authService.signup(user).then(success => {
            console.log(success);
            this.router.navigate(['/']);
        });
    }

}
