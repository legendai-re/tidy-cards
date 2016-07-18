import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { IvItemTweet } from './iv-item-tweet.class';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

@Component({
    selector: 'iv-item-tweet',
    templateUrl: 'iv-item-tweet.component.html',
    styleUrls: ['iv-item-tweet.component.scss'],
    directives: [ROUTER_DIRECTIVES]
})

export class IvItemTweetComponent {

    constructor() {
    }

    @Input('itemTweet') itemTweet: IvItemTweet;

}
