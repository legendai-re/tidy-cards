import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute }       from '@angular/router';
import { URLSearchParams  }             from '@angular/http';
import { IvAuthService }                from '../../tc-auth/tc-auth.service';
import { IvResetService }               from '../tc-reset.service';
import { IvUser }                       from '../../tc-user/tc-user.class';

@Component({
    templateUrl: './tc-reset-complete.component.html'
})

export class IvResetCompleteComponent implements OnInit, OnDestroy  {

    public password: string;
    public passwordRepeat: string;
    public resetToken: string;
    private sub: any;

    constructor(
        private resetService: IvResetService,
        private route: ActivatedRoute,
        public authService: IvAuthService,
        public router: Router) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.resetToken = params['reset_token'];
            console.log(this.resetToken);
        });
    }

    public completeReset(){
        if(!this.password || this.password != this.passwordRepeat)
            return;
        this.resetService.putResetComplete(this.resetToken, this.password).subscribe((res) => {
            if(res.success){
                this.authService.initCurrentUser().then(success => {
                    this.router.navigate(['/', this.authService.currentUser.username]);
                })
            }
        })
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
