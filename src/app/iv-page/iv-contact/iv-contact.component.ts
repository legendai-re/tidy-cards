import { Component } from '@angular/core';
import { IvLanguageService } from '../../iv-language/iv-language.service';

@Component({
    templateUrl: './iv-contact.component.html',
    styleUrls: ['../iv-page.component.scss','./iv-contact.component.scss']
})
export class IvContactComponent{

    constructor(public t: IvLanguageService) {
    }
}
