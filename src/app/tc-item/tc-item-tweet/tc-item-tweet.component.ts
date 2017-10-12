import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { IvItemTweet } from './tc-item-tweet.class';

@Component({
    selector: 'tc-item-tweet',
    templateUrl: 'tc-item-tweet.component.html',
    styleUrls: ['../tc-item.component.scss', 'tc-item-tweet.component.scss']
})

export class IvItemTweetComponent implements AfterViewInit {

    @Input() itemTweet: IvItemTweet;

    constructor() {
    }

    ngAfterViewInit(){
        window.document.getElementById('render_tweet').click();
    }
}
