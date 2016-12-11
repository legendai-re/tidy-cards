import { Component } from '@angular/core';
import { IvLanguageService } from '../../iv-language/iv-language.service';

@Component({
    templateUrl: './iv-about.component.html',
    styleUrls: ['../iv-page.component.scss','./iv-about.component.scss']
})
export class IvAboutComponent{

    constructor(public t: IvLanguageService) {
    }
}
