import { Component, Input } from '@angular/core';
import { IvItemUrl } from './iv-item-url.class';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    selector: 'iv-item-url',
    templateUrl: 'iv-item-url.component.html',
    styleUrls: ['../iv-item.component.scss', 'iv-item-url.component.scss'],
    directives: [ROUTER_DIRECTIVES]
})

export class IvItemUrlComponent {

    @Input('itemUrl') itemUrl: IvItemUrl;

    constructor() {
    }

}
