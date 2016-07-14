import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute }       from '@angular/router';
import { URLSearchParams  }             from '@angular/http';
import { AuthService }                  from '../auth/auth.service';
import { UserService }                  from './user.service';
import { User }                         from './user.class';

@Component({
    selector: 'public-profile',
    templateUrl: './user-public.component.html'
})

export class UserPublicComponent implements OnInit, OnDestroy  {

    private user: User;
    private sub: any;

    constructor(private userService: UserService, private route: ActivatedRoute, public authService: AuthService, public router: Router) {
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
