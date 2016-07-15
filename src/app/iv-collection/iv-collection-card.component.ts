import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { IvCollection } from './iv-collection.class';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

@Component({
    selector: 'iv-collection-card',
    templateUrl: 'iv-collection-card.component.html',
    styleUrls: ['iv-collection-card.component.scss'],
    directives: [ROUTER_DIRECTIVES]
})

export class IvCollectionCardComponent {

    constructor() {
    }

    @Input('collection') collection: IvCollection;

}
