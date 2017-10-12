import { Component } from '@angular/core';
import { IvLanguageService } from '../../tc-language/tc-language.service';

@Component({
    templateUrl: './tc-team.component.html',
    styleUrls: ['../tc-page.component.scss','./tc-team.component.scss']
})
export class IvTeamComponent{

    constructor(public t: IvLanguageService) {
    }
}
