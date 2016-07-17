import { Component, OnInit, OnDestroy, EventEmitter, Input } from '@angular/core';
import { SafeResourceUrl, DomSanitizationService } from '@angular/platform-browser';
import { Router, ActivatedRoute }       from '@angular/router';
import { Observable }                   from 'rxjs/Observable';
import { URLSearchParams  }             from '@angular/http';
import {FILE_UPLOAD_DIRECTIVES }        from 'ng2-file-upload';
import { IvCollection }                 from '../iv-collection/iv-collection.class';
import { IvItem }                       from './iv-item.class';
import { IvItemUrl }                    from './iv-item-url.class';
import { IvItemYoutube }                from './iv-item-youtube.class';
import { IvItemService }                from './iv-item.service'
import { IvItemContentService }         from './iv-item-content.service';

@Component({
    selector: 'iv-item-create',
    templateUrl: './iv-item-create.component.html'
})

export class IvItemCreateComponent implements OnInit {
    public item: IvItem;
    public itemCreated: boolean;
    public urlEntry: string;
    public loadingContent: boolean;
    public itemTypes: any;
    private typingTimer;
    private doneTypingInterval: number;

    @Input('collection') collection: IvCollection;

    constructor(public sanitizer: DomSanitizationService, private itemService: IvItemService, private itemContentService: IvItemContentService) {
        this.doneTypingInterval = 1000;
        this.itemTypes = IvItem.ITEM_TYPES;
    }

    ngOnInit() {
        this.item = new IvItem();
        this.item._collection = this.collection._id;
        this.urlEntry = '';
        this.itemCreated = false;
        this.loadingContent = false;
    }

    public onUrlKeyUp(){
        clearTimeout(this.typingTimer);
        new Promise((resolve, reject) => {
            this.typingTimer = setTimeout(()=>{resolve(true);}, this.doneTypingInterval);
        }).then((e)=>{
            this.createContentFromUrl();
        })
    }

    public onUrlKeyDown(){
        clearTimeout(this.typingTimer);
    }

    private createContentFromUrl(){
       this.loadingContent = true;
       this.itemContentService.getContentFromUrl(this.urlEntry).then((result) => {
           this.item.type = result.type;
           this.item._content = result._content;
           this.loadingContent = false;
       })
    }

    public onCreatItemSubmit() {
        if(this.item._content){
            this.itemService.postItem(this.item).subscribe(itemResponse => {
                this.item._id = itemResponse._id;
                this.item.createdAt = itemResponse.createdAt;
                this.item._content._id = itemResponse._content._id;
                console.log(this.item);
                this.itemCreated = true;
            });
        }
    }

}
