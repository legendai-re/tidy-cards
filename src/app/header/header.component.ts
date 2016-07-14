import { Component, OnInit }   from '@angular/core';
import { Router }               from '@angular/router';
import { ROUTER_DIRECTIVES }    from '@angular/router';
import { AuthService }          from '../auth/auth.service';

@Component({
    selector: 'my-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    directives: [ROUTER_DIRECTIVES]
})
export class HeaderComponent {
    constructor(public authService: AuthService, public router: Router) {}
}
