import { Component, OnInit }    from '@angular/core';
import { Router }               from '@angular/router';
import { AuthService }          from '../auth/auth.service';

@Component({
    selector: 'private-profile',
    templateUrl: './user-private.component.html'
})

export class UserPrivateComponent {

    constructor(public authService: AuthService, public router: Router) {
    }

}
