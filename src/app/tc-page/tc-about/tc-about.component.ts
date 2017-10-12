import { Component } from '@angular/core';
import { IvLanguageService } from '../../tc-language/tc-language.service';

@Component({
    templateUrl: './tc-about.component.html',
    styleUrls: ['../tc-page.component.scss','./tc-about.component.scss']
})
export class IvAboutComponent{

    constructor(public t: IvLanguageService) {
    }
}
