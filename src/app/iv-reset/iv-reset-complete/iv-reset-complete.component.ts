import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute }       from '@angular/router';
import { URLSearchParams  }             from '@angular/http';
import { IvAuthService }                from '../../iv-auth/iv-auth.service';
import { IvResetService }               from '../iv-reset.service';
import { IvUser }                       from '../../iv-user/iv-user.class';

@Component({
    templateUrl: './iv-reset-complete.component.html'
})

export class IvResetCompleteComponent implements OnInit, OnDestroy  {

    public password: string;
    public passwordRepeat: string;
    public resetToken: string;
    private sub: any;

    constructor(private resetService: IvResetService, private route: ActivatedRoute, public authService: IvAuthService, public router: Router) {
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
