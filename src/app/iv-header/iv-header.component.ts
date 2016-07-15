import { Component, OnInit }    from '@angular/core';
import { Router }               from '@angular/router';
import { ROUTER_DIRECTIVES }    from '@angular/router';
import { IvAuthService }          from '../iv-auth/iv-auth.service';

@Component({
    selector: 'iv-header',
    templateUrl: './iv-header.component.html',
    styleUrls: ['./iv-header.component.scss'],
    directives: [ROUTER_DIRECTIVES]
})
export class IvHeaderComponent {
    constructor(public authService: IvAuthService, public router: Router) {}
}
