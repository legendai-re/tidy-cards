import { Component, OnInit }    from '@angular/core';
import { Router }               from '@angular/router';
import { ROUTER_DIRECTIVES }    from '@angular/router';
import { IvCollectionService }  from './iv-collection/iv-collection.service';
import { IvUserService }        from './iv-user/iv-user.service';
import { IvImgUploadService }   from './iv-image/iv-image-upload.service';
import { IvAuthService }        from './iv-auth/iv-auth.service';
import { IvHeaderComponent}     from './iv-header/iv-header.component';

import 'bootstrap/dist/js/bootstrap.js';
import '../style/app.scss';

@Component({
    selector: 'iv-app',
    templateUrl: './iv-app.component.html',
    styleUrls: ['./iv-app.component.scss'],
    directives: [ROUTER_DIRECTIVES, IvHeaderComponent],
    providers: [IvCollectionService, IvUserService, IvImgUploadService]
})

export class IvAppComponent {
    constructor(public authService: IvAuthService, public router: Router) {
        authService.initCurrentUser().then(success => {
        });
    }
}
