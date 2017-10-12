import { Component, ElementRef, HostListener, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { IvItem } from './tc-item.class';
import { IvItemService } from './tc-item.service';

@Component({
    selector: 'tc-item',
    templateUrl: 'tc-item.component.html',
    styleUrls: ['tc-item.component.scss']
 })

export class IvItemComponent implements OnInit{

    public itemTypes: any;
    public intentToUpdate: boolean;

    @Input() item: IvItem;
    @Input() isAuthor: boolean;
    @Output() deletedItem = new EventEmitter();

    constructor(private itemService: IvItemService) {
        this.itemTypes = IvItem.ITEM_TYPES;
    }

    ngOnInit(){
        this.intentToUpdate = false;
    }

    public updateItemIntent(){
        this.intentToUpdate = true;
    }

    public onItemUpdatedCanceled(){
        this.intentToUpdate = false;
    }

    public deleteItem(){
        this.itemService.deleteItem(this.item._id).subscribe((e) => {
            this.deletedItem.emit({
                value: this.item
            });
        });
    }

    public onItemUpdated(event){
        if(event.value){
            this.item = event.value;
            this.intentToUpdate = false;
        }
    }

    public onSubCollectionUpdated(event){
        if(event.value){
            this.item._content = event.value;
            this.intentToUpdate = false;
        }
    }
}
