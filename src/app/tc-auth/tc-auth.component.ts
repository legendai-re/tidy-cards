import { Component, OnInit }   from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TcAuthService } from './tc-auth.service';
import { TcHeaderService } from '../tc-header/tc-header.service';
import { TcLanguageService } from '../tc-language/tc-language.service';

@Component({
    templateUrl: './tc-auth.component.html',
    styleUrls: ['./tc-auth.component.scss']
})

export class TcAuthComponent implements OnInit{

    public inLogin: boolean;
    private sub: any;

    constructor(
        public t: TcLanguageService,
        private headerService: TcHeaderService,
        public authService: TcAuthService,
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
