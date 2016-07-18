import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { IvItemUrl } from './iv-item-url.class';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

@Component({
    selector: 'iv-item-url',
    templateUrl: 'iv-item-url.component.html',
    styleUrls: ['iv-item-url.component.scss'],
    directives: [ROUTER_DIRECTIVES]
})

export class IvItemUrlComponent {

    constructor() {
    }

    @Input('itemUrl') itemUrl: IvItemUrl;

}
