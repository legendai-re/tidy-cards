import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService }          from '../auth/auth.service';
import { User }    from './user.class';
import { UserPublicComponent }  from './user-public.component'
import { UserPrivateComponent } from './user-private.component'

@Component({
    templateUrl: './user.component.html',
    directives: [UserPublicComponent, UserPrivateComponent]    
})

export class UserComponent implements OnInit, OnDestroy  {

    private sub: any;
    private displayPublic: boolean;

    constructor(private route: ActivatedRoute, public authService: AuthService, public router: Router) {
        this.displayPublic = true;   
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            let userId = params['user_id'];
            if(this.authService.isLoggedIn && this.authService.currentUser._id == userId)
                this.displayPublic = false;
            else
                this.displayPublic = true;            
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}