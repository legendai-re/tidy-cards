import { Component, Input } from '@angular/core';
import { IvItemUrl } from './iv-item-url.class';

@Component({
    selector: 'iv-item-url',
    templateUrl: 'iv-item-url.component.html',
    styleUrls: ['../iv-item.component.scss', 'iv-item-url.component.scss']
})

export class IvItemUrlComponent {

    @Input() itemUrl: IvItemUrl;

    constructor() {
    }

}
