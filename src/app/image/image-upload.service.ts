import { Injectable }             from '@angular/core';
import { Observable }             from 'rxjs/Observable';
import { FILE_UPLOAD_DIRECTIVES,
         FileUploader }           from 'ng2-file-upload';
import { Image }                  from './image.class';
import { ApiUrl }                 from '../shared/api-url';


@Injectable()
export class ImgUploadService {

    public uploader: FileUploader;

    constructor() {
        this.uploader = new FileUploader({url: ApiUrl.IMAGES});
    }

    public tryUploadAndGetImage(event, type): Observable<Image> {
        this.setUploadUrl(type);
        return Observable.create(observer => {
            this.onfileChange(event).subscribe(observable => {
                observer.next(observable);
                observer.complete();
            });
        });
    }

    private setUploadUrl(type) {
        this.uploader.options.url = ApiUrl.IMAGES + '?type=' + type._id;
    }

    private onfileChange(event): Observable<Image> {
        return Observable.create(observer => {
            if ( event.currentTarget.files.length > 0 ) {
                setTimeout(() => {
                    for ( let i = 0; i < this.uploader.queue.length; i++ ) {
                        if ( !this.uploader.queue[i].isUploading ) {
                            this.uploadAndGetImage(this.uploader.queue[i]).subscribe(image => {
                                observer.next(image);
                                observer.complete();
                            });
                        }
                    }
                }, 100);
            }
        });
    }

    private uploadAndGetImage(item): Observable<Image> {
        return Observable.create(observer => {
            item.upload();
            let interval = setInterval(() => {
                if ( item._xhr != null && item._xhr.response && item._xhr.response != null && item._xhr.response !== '' ) {
                    observer.next(Image.createFormJson(JSON.parse(item._xhr.response).data));
                    item.remove();
                    clearInterval(interval);
                    observer.complete();
                }
            }, 250);
        });
    }
}
