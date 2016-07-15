import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { Collection } from './collection.class';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

@Component({
    selector: 'myCollectionCard',
    templateUrl: 'collection-card.component.html',
    styleUrls: ['collection-card.component.scss'],
    directives: [ROUTER_DIRECTIVES]
})

export class CollectionCardComponent {

    constructor() {
    }

    @Input('collection') collection: Collection;

}
