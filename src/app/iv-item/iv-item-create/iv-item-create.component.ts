import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DomSanitizationService } from '@angular/platform-browser';
import { Observable }             from 'rxjs/Observable';
import { IvCollection }           from '../../iv-collection/iv-collection.class';
import { IvItem }                 from '../iv-item.class';
import { IvItemService }          from '../iv-item.service'
import { IvItemYoutubeComponent } from '../iv-item-youtube/iv-item-youtube.component';
import { IvItemUrlComponent }     from '../iv-item-url/iv-item-url.component';
import { IvItemTweetComponent }   from '../iv-item-tweet/iv-item-tweet.component';
import { IvItemImageComponent }   from '../iv-item-image/iv-item-image.component';
import { IvItemContentService }   from '../iv-item-content.service';

@Component({
    selector: 'iv-item-create',
    styleUrls: ['iv-item-create.component.scss'],
    templateUrl: './iv-item-create.component.html',
    directives: [IvItemTweetComponent, IvItemUrlComponent, IvItemYoutubeComponent, IvItemImageComponent]
})

export class IvItemCreateComponent implements OnInit {
    public mode: string;
    public actionIntent: boolean;
    public item: IvItem;
    public itemCreated: boolean;
    public urlEntry: string;
    public lastCheckedUrlEntry: string;
    public loadingContent: boolean;
    public itemTypes: any;
    public validUrl: boolean;
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
            this.lastCheckedUrlEntry = this.urlEntry;
            this.validUrl = true;
        }
        if(this.item.description)this.addDescription = true;
        this.actionIntent = true;
    }

    public onUrlFocus(){
        this.actionIntent = true;
    }

    public onUrlKeyUp(){
        clearTimeout(this.typingTimer);
        new Promise((resolve, reject) => {
            this.typingTimer = setTimeout(()=>{resolve(true);}, this.doneTypingInterval);
        }).then((e)=>{
            if((!this.item._content) || (this.urlEntry != this.lastCheckedUrlEntry))
                this.createContentFromUrl();
        })
    }

    public onUrlKeyDown(event){
        if (event.keyCode == 65 && event.ctrlKey) {
            event.target.select()
        }
        if((!this.item._content) || (this.urlEntry != this.lastCheckedUrlEntry))
            this.loadingContent = true;
        clearTimeout(this.typingTimer);
    }

    public onDescriptionKeyDown(event){
        if (event.keyCode == 65 && event.ctrlKey) {
            event.target.select()
        }
    }

    private createContentFromUrl(){
       this.lastCheckedUrlEntry = this.urlEntry;
       this.loadingContent = true;
       this.itemContentService.getContentFromUrl(this.urlEntry).then((result) => {
           if(result){
               this.item.type = result.type;
               this.item._content = result._content;
               this.validUrl = true;
           }else{
               this.item._content = null;
               this.validUrl = false;
           }
           this.loadingContent = false;
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
        return !this.loadingContent && (this.item._content || !this.item._content && this.item.description);
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
