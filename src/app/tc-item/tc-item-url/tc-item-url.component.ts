import { Component, Input } from '@angular/core';
import { IvItemUrl } from './tc-item-url.class';

@Component({
    selector: 'tc-item-url',
    templateUrl: 'tc-item-url.component.html',
    styleUrls: ['../tc-item.component.scss', 'tc-item-url.component.scss']
})

export class IvItemUrlComponent {

    @Input() itemUrl: IvItemUrl;

    constructor() {
    }

}
