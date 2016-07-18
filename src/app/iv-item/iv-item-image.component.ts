import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { IvItemImage } from './iv-item-image.class';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

@Component({
    selector: 'iv-item-image',
    templateUrl: 'iv-item-image.component.html',
    styleUrls: ['iv-item-image.component.scss'],
    directives: [ROUTER_DIRECTIVES]
})

export class IvItemImageComponent {

    constructor() {
    }

    @Input('itemImage') itemImage: IvItemImage;

}
