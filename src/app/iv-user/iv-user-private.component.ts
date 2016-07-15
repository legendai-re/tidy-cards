import { Component, OnInit }    from '@angular/core';
import { Router }               from '@angular/router';
import { IvAuthService }          from '../iv-auth/iv-auth.service';

@Component({
    selector: 'iv-private-profile',
    templateUrl: './iv-user-private.component.html'
})

export class IvUserPrivateComponent {

    constructor(public authService: IvAuthService, public router: Router) {
    }

}
