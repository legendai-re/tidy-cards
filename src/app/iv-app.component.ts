import { Component, OnInit, ViewChild } from '@angular/core';
import { Router }               from '@angular/router';
import { IvAuthService }        from './iv-auth/iv-auth.service';
import { IvLanguageService }    from './iv-language/iv-language.service';

import '../style/app.scss';

@Component({
    selector: 'iv-app',
    templateUrl: './iv-app.component.html',
    styleUrls: ['./iv-app.component.scss']
})

export class IvAppComponent {

    constructor(public t: IvLanguageService, public authService: IvAuthService, public router: Router) {
        var url = null;
        this.router.events.subscribe((route) => {
            if(!url){
                url=route.url.split(';')[0];
                let params = [];
                for(let i=1; i<route.url.split(';').length; i++){
                    var keyValue=route.url.split(';')[i].split('=');
                    if(keyValue.length == 2)
                        params[keyValue[0]] = decodeURIComponent(keyValue[1]);
                }
                authService.initCurrentUser().then(success => {
                    this.router.navigate([url, params]);
                });
            }
        })
    }
}
