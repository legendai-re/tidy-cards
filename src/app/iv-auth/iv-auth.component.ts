import { Component, OnInit }   from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IvAuthService } from './iv-auth.service';
import { IvHeaderService } from '../iv-header/iv-header.service';
import { IvLanguageService } from '../iv-language/iv-language.service';

@Component({
    templateUrl: './iv-auth.component.html',
    styleUrls: ['./iv-auth.component.scss']
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
