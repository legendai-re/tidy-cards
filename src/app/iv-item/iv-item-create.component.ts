import { Component, OnInit, Output, OnDestroy, EventEmitter, Input } from '@angular/core';
import { SafeResourceUrl, DomSanitizationService, SafeScript } from '@angular/platform-browser';
import { Router, ActivatedRoute }       from '@angular/router';
import { Observable }                   from 'rxjs/Observable';
import { URLSearchParams  }             from '@angular/http';
import {FILE_UPLOAD_DIRECTIVES }        from 'ng2-file-upload';
import { IvCollection }                 from '../iv-collection/iv-collection.class';
import { IvItem }                       from './iv-item.class';
import { IvItemUrl }                    from './iv-item-url.class';
import { IvItemYoutube }                from './iv-item-youtube.class';
import { IvItemService }                from './iv-item.service'
import { IvItemYoutubeComponent } from './iv-item-youtube.component';
import { IvItemUrlComponent } from './iv-item-url.component';
import { IvItemTweetComponent } from './iv-item-tweet.component';
import { IvItemImageComponent } from './iv-item-image.component';
import { IvItemContentService }         from './iv-item-content.service';

@Component({
    selector: 'iv-item-create',
    styleUrls: ['iv-item-create.component.scss'],
    templateUrl: './iv-item-create.component.html',
    directives: [IvItemTweetComponent, IvItemUrlComponent, IvItemYoutubeComponent, IvItemImageComponent]
})

export class IvItemCreateComponent implements OnInit {
    public mode: string;
    public item: IvItem;
    public itemCreated: boolean;
    public urlEntry: string;
    public loadingContent: boolean;
    public itemTypes: any;
    public validUrl: boolean;
    public tweetRendered: boolean;
    public addDescription: boolean;
    private typingTimer;
    private doneTypingInterval: number;

    @Input('item') inputItem: IvItem;
    @Input('collection') collection: IvCollection;
    @Output() newItem = new EventEmitter();
    @Output() updateCanceled = new EventEmitter();

    constructor(public sanitizer: DomSanitizationService, private itemService: IvItemService, private itemContentService: IvItemContentService) {
        this.doneTypingInterval = 1000;
        this.itemTypes = IvItem.ITEM_TYPES;
    }

    ngOnInit() {
        this.init();
    }

    private init(){
        this.itemCreated = false;
        this.loadingContent = false;
        this.addDescription = false;
        if(this.inputItem!=null){
            this.initUpdateMode();
        }else{
            this.initCreateMode();
        }
    }

    private initCreateMode(){
        this.mode = 'CREATE';
        this.item = new IvItem();
        this.item._collection = this.collection._id;
        this.urlEntry = '';
        this.validUrl = false;
    }

    private initUpdateMode(){
        this.mode = 'UPDATE';
        this.item = IvItem.createFormJson(this.inputItem);
        if(this.item._content!=null){
            this.urlEntry = this.item._content.url;
            this.validUrl = true;
        }
        if(this.item.description)this.addDescription = true;
    }

    public onUrlKeyUp(){
        clearTimeout(this.typingTimer);
        new Promise((resolve, reject) => {
            this.typingTimer = setTimeout(()=>{resolve(true);}, this.doneTypingInterval);
        }).then((e)=>{
            if((!this.item._content) || (this.urlEntry != this.item._content.url))
                this.createContentFromUrl();
        })
    }

    public onUrlKeyDown(){
        if((!this.item._content) || (this.urlEntry != this.item._content.url))
            this.loadingContent = true;
        clearTimeout(this.typingTimer);
    }

    private createContentFromUrl(){
       this.loadingContent = true;
       this.itemContentService.getContentFromUrl(this.urlEntry).then((result) => {
           if(result){
               this.item.type = result.type;
               this.item._content = result._content;
               this.tweetRendered = false;
               this.renderTweet().subscribe((success) => {
                    this.tweetRendered = true;
               })
               this.validUrl = true;
           }else{
               this.item._content = null;
               this.validUrl = false;
           }
           this.loadingContent = false;
       })
    }

    private renderTweet(): Observable<Boolean>{
         return Observable.create(observer => {
            setTimeout(()=>{
                window.document.getElementById('render_tweet').click();
                setTimeout(()=>{
                    observer.next(true);
                    observer.complete();
                },500);
            },200)
        })
    }

    public resetItemContent(){
        this.urlEntry = '';
        this.item._content = null;
        this.validUrl = false;
    }

    public onItemSubmit(){
        if(this.isValidToSave()){
            if(this.mode == 'CREATE')
                this.createItem();
            else
                this.updateItem();
        }
    }

    private isValidToSave(){
        if(!this.item._content)this.item.type = IvItem.ITEM_TYPES.TEXT;
        return this.item._content && this.item._content.url==this.urlEntry || !this.item._content && this.item.description;
    }

    private createItem() {
        this.itemService.postItem(this.item).subscribe(itemResponse => {
            this.item._id = itemResponse._id;
            this.item.createdAt = itemResponse.createdAt;
            if(itemResponse._content)
                this.item._content._id = itemResponse._content._id;
            this.itemCreated = true;
            this.newItem.emit({
                value: this.item
            });
            this.init();
        });
    }

    private updateItem(){
        this.itemService.putItem(this.item).subscribe(itemResponse => {
            this.item.updatedAt = itemResponse.updatedAt;
            this.newItem.emit({
                value: this.item
            });
        })
    }

    public cancelUpdate(){
        this.updateCanceled.emit({});
    }
}
