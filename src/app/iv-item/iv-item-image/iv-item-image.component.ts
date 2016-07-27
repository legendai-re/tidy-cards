import { Component, Input } from '@angular/core';
import { IvItemImage } from './iv-item-image.class';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    selector: 'iv-item-image',
    templateUrl: 'iv-item-image.component.html',
    styleUrls: ['../iv-item.component.scss', 'iv-item-image.component.scss'],
    directives: [ROUTER_DIRECTIVES]
})

export class IvItemImageComponent {

    @Input('itemImage') itemImage: IvItemImage;

    constructor() {
    }

}
