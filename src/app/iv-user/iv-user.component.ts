import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute }       from '@angular/router';
import { IvAuthService }                  from '../iv-auth/iv-auth.service';
import { IvUser }                         from './iv-user.class';
import { IvUserPublicComponent }          from './iv-user-public.component';
import { IvUserPrivateComponent }         from './iv-user-private.component';

@Component({
    templateUrl: './iv-user.component.html',
    directives: [IvUserPublicComponent, IvUserPrivateComponent]
})

export class IvUserComponent implements OnInit, OnDestroy  {

    private sub: any;
    private displayPublic: boolean;

    constructor(private route: ActivatedRoute, public authService: IvAuthService, public router: Router) {
        this.displayPublic = true;
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            let userId = params['user_id'];
            if (this.authService.isLoggedIn && this.authService.currentUser._id === userId) {
                this.displayPublic = false;
            } else {
                this.displayPublic = true;
            }
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
