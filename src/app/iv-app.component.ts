import { Component, OnInit, ViewChild } from '@angular/core';
import { Router }               from '@angular/router';
import { ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';
import { IvCollectionService }  from './iv-collection/iv-collection.service';
import { IvStarService }        from './iv-star/iv-star.service';
import { IvItemService }        from './iv-item/iv-item.service';
import { IvUserService }        from './iv-user/iv-user.service';
import { IvImgUploadService }   from './iv-image/iv-image-upload.service';
import { IvAuthService }        from './iv-auth/iv-auth.service';
import { IvHeaderComponent }    from './iv-header/iv-header.component';
import { IvHeaderService }      from './iv-header/iv-header.service';
import { IvResetService }       from './iv-reset/iv-reset.service';
import { IvLanguageService }    from './iv-language/iv-language.service';

import 'bootstrap/dist/js/bootstrap.js';
import '../style/app.scss';

@Component({
    selector: 'iv-app',
    templateUrl: './iv-app.component.html',
    styleUrls: ['./iv-app.component.scss'],
    directives: [ROUTER_DIRECTIVES, IvHeaderComponent],
    providers: [IvResetService, IvStarService, IvHeaderService, IvItemService, IvCollectionService, IvUserService, IvImgUploadService]
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
