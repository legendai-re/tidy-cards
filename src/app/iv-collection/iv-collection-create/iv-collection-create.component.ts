import { Component, OnInit, EventEmitter, OnDestroy, Input, Output } from '@angular/core';
import { Router, ActivatedRoute }       from '@angular/router';
import { URLSearchParams  }             from '@angular/http';
import { IvLanguageService }            from '../../iv-language/iv-language.service';
import { IvCollectionService }          from '../iv-collection.service';
import { IvCollection }                 from '../iv-collection.class';
import { IvImage }                      from '../../iv-image/iv-image.class';
import { IvImgUploadService }           from '../../iv-image/iv-image-upload.service';

@Component({
    selector: 'iv-collection-create',
    templateUrl: './iv-collection-create.component.html',
    styleUrls: ['../iv-collection-card/iv-collection-card.component.scss', 'iv-collection-create.component.scss'],
})

export class IvCollectionCreateComponent implements OnInit {
    public mode: string;
    public actionIntent: boolean;
    public collection: IvCollection;
    public uploader;
    public collectionCreated: boolean;
    public visibilityList: any;

    @Input() parentCollection: IvCollection;
    @Input() inputCollection: IvCollection;
    @Output() newCollection = new EventEmitter();
    @Output() updateCanceled = new EventEmitter();

    constructor(public t: IvLanguageService, private collectionService: IvCollectionService, private imgUploadService: IvImgUploadService, private router: Router) {
        this.uploader = imgUploadService.uploader;
        this.visibilityList = IvCollection.VISIBILITY;
    }

    ngOnInit() {
        this.collectionCreated = false;
        if(this.inputCollection!=null){
            this.initUpdateMode();
        }else if(this.parentCollection!=null){
            this.initCreateSubCollectionMode();
        }else{
            this.initCreateMode();
        }
    }

    private initCreateMode(){
        this.mode = 'CREATE';
        this.collection = new IvCollection();
        this.collection.visibility = IvCollection.VISIBILITY.PRIVATE;
        this.collection.color = 'FFFFFF';
    }

    private initUpdateMode(){
        this.mode = 'UPDATE';
        this.collection = IvCollection.createFormJson(this.inputCollection);
        this.actionIntent = true;
    }

    private initCreateSubCollectionMode(){
        this.mode = 'CREATE_SUB_COLLECTION';
        this.collection = new IvCollection();
        this.collection.visibility = this.parentCollection.visibility;
        this.collection._parent = this.parentCollection._id;
    }

    public onThumbnailFileChange(event) {
        this.imgUploadService.tryUploadAndGetImage(event, IvImage.getTypes().COLLECTION_THUMBNAIL).subscribe(image => {
            this.collection._thumbnail = image;
        });
    }

    public onCollectionFocus(){
        this.actionIntent = true;
    }

    public clickColor(color){
        if(this.collection.color == color){
            this.collection.color = 'FFFFFF';
        }else{
            this.collection.color = color;
        }
    }

    public cancelCollectionUpdate(){
        this.updateCanceled.emit({value: null});
    }

    public onCollectionSubmit(){
        if(this.mode == 'CREATE' || this.mode == 'CREATE_SUB_COLLECTION')
            this.createCollection();
        else
            this.updateCollection();
    }

    private createCollection() {
        if(!this.collection.color || this.collection.color == 'FFFFFF' ){
            this.collection.color = 'CFD8DC';
        }
        this.collectionService.postCollection(this.collection).subscribe(collection => {
            this.collection._id = collection._id;
            this.collectionCreated = true;
            this.newCollection.emit({
                value: this.collection
            });
        });
    }

    private updateCollection() {
        this.collectionService.putCollection(this.collection).subscribe(collectionResponse => {
            this.collection.updatedAt = collectionResponse.updatedAt;
            this.newCollection.emit({
                value: this.collection
            });
        });
    }

}
