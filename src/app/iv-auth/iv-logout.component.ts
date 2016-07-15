import { Component }   from '@angular/core';
import { Router }      from '@angular/router';
import { IvAuthService } from './iv-auth.service';

@Component({
    template: ''
})

export class IvLogoutComponent {

    constructor(public authService: IvAuthService, public router: Router) {
        this.authService.logout();
    }

}
