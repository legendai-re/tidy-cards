import { Component, Input } from '@angular/core';
import { TcItemImage } from './tc-item-image.class';

@Component({
    selector: 'tc-item-image',
    templateUrl: 'tc-item-image.component.html',
    styleUrls: ['../tc-item.component.scss', 'tc-item-image.component.scss']
})

export class TcItemImageComponent {

    @Input() itemImage: TcItemImage;

    constructor() {
    }

}
