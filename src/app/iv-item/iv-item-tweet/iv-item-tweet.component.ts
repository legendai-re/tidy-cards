import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { IvItemTweet } from './iv-item-tweet.class';

@Component({
    selector: 'iv-item-tweet',
    templateUrl: 'iv-item-tweet.component.html',
    styleUrls: ['../iv-item.component.scss', 'iv-item-tweet.component.scss']
})

export class IvItemTweetComponent implements AfterViewInit {

    @Input() itemTweet: IvItemTweet;

    constructor() {
    }

    ngAfterViewInit(){
        window.document.getElementById('render_tweet').click();
    }
}
