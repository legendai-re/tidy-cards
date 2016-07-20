import { Component, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { IvItem } from './iv-item.class';
import { IvItemService } from './iv-item.service';
import { IvItemYoutubeComponent } from './iv-item-youtube.component';
import { IvItemUrlComponent } from './iv-item-url.component';
import { IvItemTweetComponent } from './iv-item-tweet.component';
import { IvItemImageComponent } from './iv-item-image.component';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

@Component({
    selector: 'iv-item',
    templateUrl: 'iv-item.component.html',
    styleUrls: ['iv-item.component.scss'],
    directives: [ROUTER_DIRECTIVES, IvItemTweetComponent, IvItemUrlComponent, IvItemYoutubeComponent, IvItemImageComponent]
})

export class IvItemComponent {

    public itemTypes: any;

    @Input('item') item: IvItem;
    @Input('isAuthor') isAuthor: boolean;
    @Output() deletedItem = new EventEmitter();

    constructor(private itemService: IvItemService) {
        this.itemTypes = IvItem.ITEM_TYPES;
    }

    public deleteItem(){
        this.itemService.deleteItem(this.item._id).subscribe((e) => {
            this.deletedItem.emit({
                value: this.item
            });
        });
    }



}
