import { Component, OnInit } from '@angular/core';
import { TcLanguageService } from '../../tc-language/tc-language.service';
import { TcHeaderService } from '../../tc-header/tc-header.service';

@Component({
    templateUrl: './tc-about.component.html',
    styleUrls: ['../tc-page.component.scss','./tc-about.component.scss']
})
export class TcAboutComponent implements OnInit{

    constructor(public t: TcLanguageService, public headerService: TcHeaderService) {
    }

    ngOnInit() {
    	this.emitUpdateHeaderEvent();
    	setTimeout( () => {
            $("#pageHeadings").removeClass('is-hidden');
            $(".page-container").removeClass('is-hidden');
        }, 10);
    }

    private emitUpdateHeaderEvent(){
        this.headerService.emitUpdateHeaderEvent({
            value:{
                type: 'page'
            }
        });
    }
}
