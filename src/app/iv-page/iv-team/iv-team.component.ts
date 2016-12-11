import { Component } from '@angular/core';
import { IvLanguageService } from '../../iv-language/iv-language.service';

@Component({
    templateUrl: './iv-team.component.html',
    styleUrls: ['../iv-page.component.scss','./iv-team.component.scss']
})
export class IvTeamComponent{

    constructor(public t: IvLanguageService) {
    }
}
