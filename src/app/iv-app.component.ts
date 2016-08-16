import { Component, OnInit, ViewChild } from '@angular/core';
import { Router }               from '@angular/router';
import { ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';
import { IvAuthService }        from './iv-auth/iv-auth.service';
import { IvLanguageService }    from './iv-language/iv-language.service';
import { IvHeaderComponent }    from './iv-header/iv-header.component';

import 'bootstrap/dist/js/bootstrap.js';
import '../style/app.scss';

@Component({
    selector: 'iv-app',
    templateUrl: './iv-app.component.html',
    styleUrls: ['./iv-app.component.scss'],
    directives: [ROUTER_DIRECTIVES, IvHeaderComponent],
    providers: []
})

export class IvAppComponent {

    constructor(public t: IvLanguageService, public authService: IvAuthService, public router: Router, private activeRoute: ActivatedRoute) {
        var url = null;
        this.router.events.subscribe((route) => {
            if(!url)
                url=route.url;
        })

        authService.initCurrentUser().then(success => {
            if(url)
                this.router.navigate([url]);
        });
    }
}
