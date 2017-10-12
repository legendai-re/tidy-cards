import { Component, OnInit }   from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IvAuthService } from './tc-auth.service';
import { IvHeaderService } from '../tc-header/tc-header.service';
import { IvLanguageService } from '../tc-language/tc-language.service';

@Component({
    templateUrl: './tc-auth.component.html',
    styleUrls: ['./tc-auth.component.scss']
})

export class IvAuthComponent implements OnInit{

    public inLogin: boolean;
    private sub: any;

    constructor(
        public t: IvLanguageService,
        private headerService: IvHeaderService,
        public authService: IvAuthService,
        public router: Router,
        private route: ActivatedRoute) {
    }

    ngOnInit(){
        this.inLogin = true;
        this.headerService.emitUpdateHeaderEvent({
            value:{
                type: 'NO_HEADER'
            }
        });
        this.sub = this.route.params.subscribe(params => {
            if(params['mode'] == 'signup')
                this.inLogin = false;
        });
    }

}
