import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Observable }             from 'rxjs/Observable';
import { TcCollection }           from '../../tc-collection/tc-collection.class';
import { TcItem }                 from '../tc-item.class';
import { TcItemService }          from '../tc-item.service'

@Component({
    selector: 'tc-item-create',
    styleUrls: ['tc-item-create.component.scss'],
    templateUrl: './tc-item-create.component.html'
})

export class TcItemCreateComponent implements OnInit {

    @Input() item: TcItem;
    @Input() collection: TcCollection;
    @Output() newItem = new EventEmitter();
    @Output() updateCanceled = new EventEmitter();

    public mode: string;
    public actionIntent: boolean;
    public itemCreated: boolean;
    public urlEntry: string;
    public lastCheckedUrlEntry: string;
    public loadingContent: boolean;
    public itemTypes: any;
    public validUrl: boolean;
    public addDescription: boolean;
    private typingTimer;
    private doneTypingInterval: number;

    constructor(private itemService: TcItemService) {
        this.doneTypingInterval = 1000;
        this.itemTypes = TcItem.ITEM_TYPES;
    }

    ngOnInit() {
        this.init();
    }

    private init(){
        this.itemCreated = false;
        this.loadingContent = false;
        this.addDescription = true;
        this.actionIntent = true;
        if(this.item!=null){
            this.initUpdateMode();
        }else{
            this.initCreateMode();
        }
    }

    private initCreateMode(){
        this.mode = 'CREATE';
        this.item = new TcItem();
        this.item._collection = this.collection._id;
        this.urlEntry = '';
        this.validUrl = false;
        this.addDescription = true;
    }

    private initUpdateMode(){
        this.mode = 'UPDATE';
        this.item = TcItem.createFormJson(this.item);
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
       if(!this.urlEntry || this.urlEntry == ''){
           this.item._content = null;
           return;
       }
       this.lastCheckedUrlEntry = this.urlEntry;
       this.loadingContent = true;
       this.itemService.postItemContent(this.urlEntry).subscribe((result) => {
           if(result){
               this.item.type = result.type;
               this.item._content = result._content;
               this.item.title = this.getItemTitle();
               this.validUrl = true;
           }else{
               this.item._content = null;
               this.validUrl = false;
           }
           this.loadingContent = false;
       })
    }

    private getItemTitle(){
        switch(this.item.type.id){
            case TcItem.ITEM_TYPES.URL.id:
                return this.item._content.title;
            case TcItem.ITEM_TYPES.IMAGE.id:
                return 'image';
            case TcItem.ITEM_TYPES.YOUTUBE.id:
                return this.item._content.snippet.title;
            case TcItem.ITEM_TYPES.TWEET.id:
                return 'tweet';
            case TcItem.ITEM_TYPES.COLLECTION.id:
                return this.item._content.title;
            default:
                return '';
        }
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
        if(!this.item._content)this.item.type = TcItem.ITEM_TYPES.TEXT;
        return !this.loadingContent && (this.item.title && (this.item._content || !this.item._content && this.item.description));
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
            this.initCreateMode();
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
