import { Component, OnInit, ViewChild } from '@angular/core';
import { Router }               from '@angular/router';
import { bootstrap }            from '@angular/platform-browser-dynamic';
import { ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';
import { IvAuthService }  from './iv-auth/iv-auth.service';
import { HTTP_PROVIDERS, JSONP_PROVIDERS } from '@angular/http';
import { IvAppComponent }         from './iv-app.component';
import { IV_APP_ROUTER_PROVIDERS } from './iv-app.routes';

import 'bootstrap/dist/js/bootstrap.js';
import '../style/app.scss';

@Component({
    selector: 'iv-bootstrap',
    template: '<iv-app></iv-app>',
    directives: [IvAppComponent],
    providers: [IvAuthService]
})

export class IvBootstrapComponent {

    constructor(public authService: IvAuthService) {
        authService.initCurrentUser().then(success => {
            bootstrap(IvAppComponent, [
                IV_APP_ROUTER_PROVIDERS
                ])
            .catch(err => console.error(err));
        });
    }
}
