import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute }       from '@angular/router';
import { URLSearchParams  }             from '@angular/http';
import { IvAuthService }                  from '../iv-auth/iv-auth.service';
import { IvUserService }                  from './iv-user.service';
import { IvUser }                         from './iv-user.class';

@Component({
    selector: 'iv-public-profile',
    styleUrls: ['iv-user.component.scss'],
    templateUrl: './iv-user-public.component.html'
})

export class IvUserPublicComponent implements OnInit, OnDestroy  {

    private user: IvUser;
    private sub: any;

    constructor(private userService: IvUserService, private route: ActivatedRoute, public authService: IvAuthService, public router: Router) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            let userId = params['user_id'];
            let getParams = new URLSearchParams();
            this.userService.getUser(userId, getParams).subscribe((user) => {
                this.user = user;
            }, () => {});
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
