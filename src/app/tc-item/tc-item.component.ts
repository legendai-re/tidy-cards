import { Component, ElementRef, HostListener, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { TcItem } from './tc-item.class';
import { TcItemService } from './tc-item.service';

@Component({
    selector: 'tc-item',
    templateUrl: 'tc-item.component.html',
    styleUrls: ['tc-item.component.scss']
 })

export class TcItemComponent implements OnInit{

    public itemTypes: any;
    public intentToUpdate: boolean;

    @Input() item: TcItem;
    @Input() isAuthor: boolean;
    @Output() deletedItem = new EventEmitter();

    constructor(private itemService: TcItemService) {
        this.itemTypes = TcItem.ITEM_TYPES;
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
