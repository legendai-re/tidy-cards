import { Component, OnInit }   from '@angular/core';
import { ROUTER_DIRECTIVES, Router }      from '@angular/router';
import { IvAuthService } from './iv-auth.service';
import { IvHeaderService } from '../iv-header/iv-header.service';
import { IvSignupComponent } from './iv-signup.component';
import { IvSigninComponent } from './iv-signin.component';


@Component({
    templateUrl: './iv-auth.component.html',
    styleUrls: ['./iv-auth.component.scss'],
    directives: [ROUTER_DIRECTIVES, IvSignupComponent, IvSigninComponent]
})

export class IvAuthComponent implements OnInit{

    public inLogin: boolean;

    constructor(private headerService: IvHeaderService, public authService: IvAuthService, public router: Router) {
    }

    ngOnInit(){
        this.inLogin = true;
        this.headerService.emitUpdateHeaderEvent({
            value:{
                type: 'NO_HEADER'
            }
        });
    }

}
