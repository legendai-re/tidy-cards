import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute }       from '@angular/router';
import { URLSearchParams  }             from '@angular/http';
import { IvCollectionService }            from './iv-collection.service';
import { IvCollection }                   from './iv-collection.class';
import {FILE_UPLOAD_DIRECTIVES }        from 'ng2-file-upload';
import { IvImage }                        from '../iv-image/iv-image.class';
import { IvImgUploadService }             from '../iv-image/iv-image-upload.service';

@Component({
    selector: 'iv-create-collection',
    templateUrl: './iv-collection-create.component.html',
    styleUrls: ['iv-collection-card.component.scss', 'iv-collection-create.component.scss'],
    directives: [FILE_UPLOAD_DIRECTIVES]
})

export class IvCollectionCreateComponent implements OnInit {
    public collection: IvCollection;
    public uploader;
    public collectionCreated: boolean;

    constructor(private collectionService: IvCollectionService, private imgUploadService: IvImgUploadService ) {
        this.uploader = imgUploadService.uploader;
    }


    ngOnInit() {
        this.collection = new IvCollection();
        this.collection.visibility = IvCollection.VISIBILITY.PRIVATE;
        this.collectionCreated = false;
    }

    public onThumbnailFileChange(event) {
        this.imgUploadService.tryUploadAndGetImage(event, IvImage.getTypes().COLLECTION_THUMBNAIL).subscribe(image => {
            this.collection._thumbnail = image;
        });
    }

    public onCreatCollectionSubmit() {
        this.collectionService.postCollection(this.collection).subscribe(collection => {
            this.collection._id = collection._id;
            this.collectionCreated = true;
        });
    }

}
