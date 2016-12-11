import { Component } from '@angular/core';
import { IvLanguageService } from '../../iv-language/iv-language.service';

@Component({
    templateUrl: './iv-terms.component.html',
    styleUrls: ['../iv-page.component.scss','./iv-terms.component.scss']
})
export class IvTermsComponent{

    constructor(public t: IvLanguageService) {
    }
}
