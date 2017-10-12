import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute }       from '@angular/router';
import { URLSearchParams  }             from '@angular/http';
import { TcAuthService }                from '../../tc-auth/tc-auth.service';
import { TcCollection }                 from '../../tc-collection/tc-collection.class';
import { TcUserService }                from '../tc-user.service';
import { TcUser }                       from '../tc-user.class';

@Component({
    templateUrl: './tc-confirm-email.component.html'
})

export class TcConfirmEmailComponent implements OnInit, OnDestroy  {

    public user: TcUser;
    public confirmationInProgress: boolean;
    public emailConfirmed: boolean;
    private sub: any;

    constructor(private userService: TcUserService, private route: ActivatedRoute, public authService: TcAuthService, public router: Router) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            let confirm_token = params['confirm_token'];
            this.confirmEmail(confirm_token);
        });
    }

    private confirmEmail(token: string){
        this.confirmationInProgress = true;
        this.userService.putConfirmEmail(token).subscribe((res) => {
            this.emailConfirmed = res.success;
            this.authService.currentUser.emailConfirmed = true;
            this.confirmationInProgress = false;
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
