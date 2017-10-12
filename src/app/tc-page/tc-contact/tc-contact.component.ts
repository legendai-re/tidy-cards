import { Component } from '@angular/core';
import { IvLanguageService } from '../../tc-language/tc-language.service';

@Component({
    templateUrl: './tc-contact.component.html',
    styleUrls: ['../tc-page.component.scss','./tc-contact.component.scss']
})
export class IvContactComponent{

    constructor(public t: IvLanguageService) {
    }
}
