import { Component, Input } from '@angular/core';
import { IvItemImage } from './iv-item-image.class';

@Component({
    selector: 'iv-item-image',
    templateUrl: 'iv-item-image.component.html',
    styleUrls: ['../iv-item.component.scss', 'iv-item-image.component.scss']
})

export class IvItemImageComponent {

    @Input() itemImage: IvItemImage;

    constructor() {
    }

}
