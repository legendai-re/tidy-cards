import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { IvItemYoutube } from './iv-item-youtube.class';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

@Component({
    selector: 'iv-item-youtube',
    templateUrl: 'iv-item-youtube.component.html',
    styleUrls: ['iv-item-youtube.component.scss'],
    directives: [ROUTER_DIRECTIVES]
})

export class IvItemYoutubeComponent {

    constructor() {
    }

    @Input('itemYoutube') itemYoutube: IvItemYoutube;

}
