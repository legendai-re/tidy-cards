import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { IvItemTweet } from './iv-item-tweet.class';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    selector: 'iv-item-tweet',
    templateUrl: 'iv-item-tweet.component.html',
    styleUrls: ['../iv-item.component.scss', 'iv-item-tweet.component.scss'],
    directives: [ROUTER_DIRECTIVES]
})

export class IvItemTweetComponent implements AfterViewInit {

    @Input('itemTweet') itemTweet: IvItemTweet;

    constructor() {
    }

    ngAfterViewInit(){
        window.document.getElementById('render_tweet').click();
    }
}
