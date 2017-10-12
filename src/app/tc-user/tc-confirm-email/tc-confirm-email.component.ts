import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute }       from '@angular/router';
import { URLSearchParams  }             from '@angular/http';
import { IvAuthService }                from '../../tc-auth/tc-auth.service';
import { IvCollection }                 from '../../tc-collection/tc-collection.class';
import { IvUserService }                from '../tc-user.service';
import { IvUser }                       from '../tc-user.class';

@Component({
    templateUrl: './tc-confirm-email.component.html'
})

export class IvConfirmEmailComponent implements OnInit, OnDestroy  {

    public user: IvUser;
    public confirmationInProgress: boolean;
    public emailConfirmed: boolean;
    private sub: any;

    constructor(private userService: IvUserService, private route: ActivatedRoute, public authService: IvAuthService, public router: Router) {
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
