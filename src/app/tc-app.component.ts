import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router }               from '@angular/router';
import { IvAuthService }        from './tc-auth/tc-auth.service';
import { IvLanguageService }    from './tc-language/tc-language.service';
import { IvHeaderService }      from './tc-header/tc-header.service';

@Component({
    selector: 'tc-app',
    templateUrl: './tc-app.component.html',
    styleUrls: ['./tc-app.component.scss', '../style/app.scss'],
    encapsulation: ViewEncapsulation.None
})

export class IvAppComponent {

    constructor(public headerService: IvHeaderService, public t: IvLanguageService, public authService: IvAuthService, public router: Router) {
        var url = null;
        
        this.router.events.subscribe((route) => {
            if(!url){
                var routeAny:any;
                routeAny = route;
                url=routeAny.url.split(';')[0];
                let params = [];
                for(let i=1; i<routeAny.url.split(';').length; i++){
                    var keyValue=routeAny.url.split(';')[i].split('=');
                    if(keyValue.length == 2)
                        params[keyValue[0]] = decodeURIComponent(keyValue[1]);
                }
                authService.initCurrentUser().then(success => {
                    url = url.replace("#_=_", "");
                    this.router.navigate([url, params]);
                });
            }
        })
    }
}
