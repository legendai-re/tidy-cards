import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { TcAuthService }     from '../tc-auth/tc-auth.service';
import { TcLanguageService } from '../tc-language/tc-language.service';
import { TcHeaderService }   from '../tc-header/tc-header.service';

@Component({
	selector: 'tc-footer',
    templateUrl: './tc-footer.component.html',
    styleUrls: ['tc-footer.component.scss']
})

export class TcFooterComponent implements OnInit {

    constructor(public headerService: TcHeaderService, public t: TcLanguageService, public authService: TcAuthService, public router: Router){}
    ngOnInit(){}

}
