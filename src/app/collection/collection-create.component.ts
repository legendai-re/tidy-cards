import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute }       from '@angular/router';
import { URLSearchParams  }   from '@angular/http';
import { CollectionService }from './collection.service';
import { Collection }from './collection.class';
import {FILE_UPLOAD_DIRECTIVES } from 'ng2-file-upload';
import { ApiUrl }           from '../shared/api-url';
import { Image }            from '../image/image.class';
import { ImgUploadService } from '../image/image-upload.service';

@Component({
    selector: 'create-collection',
    templateUrl: './collection-create.component.html',
    directives: [FILE_UPLOAD_DIRECTIVES]          
})

export class CollectionCreateComponent implements OnInit {
    public collection: Collection;
    public uploader
    public collectionCreated: boolean;

    constructor(private collectionService: CollectionService, private imgUploadService: ImgUploadService){
        this.uploader = imgUploadService.uploader;
    }

    ngOnInit() {
        this.collection = new Collection();
        this.collection.visibility = 1;
        this.collectionCreated = false;
    }

    public onThumbnailFileChange(event){      
        this.imgUploadService.tryUploadAndGetImage(event, Image.getTypes().COLLECTION_THUMBNAIL).subscribe(image => {
            this.collection._thumbnail = image;
        })
    }

    public onCreatCollectionSubmit(){
        this.collectionService.postCollection(this.collection).subscribe(collection =>{
            this.collection._id = collection._id;
            this.collectionCreated = true;
        })
    }
   
}