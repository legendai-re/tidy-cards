import { Injectable }             from '@angular/core';
import { Observable }             from 'rxjs/Observable';
import { FileUploader }           from 'ng2-file-upload';
import { IvImage }                from './iv-image.class';
import { IvApiUrl }               from '../iv-shared/iv-api-url';


@Injectable()
export class IvImgUploadService {

    public uploader: FileUploader;

    constructor() {
        this.uploader = new FileUploader({url: IvApiUrl.IMAGES});
    }

    public tryUploadAndGetImage(event, type): Observable<IvImage> {
        this.setUploadUrl(type);
        return Observable.create(observer => {
            this.onfileChange(event).subscribe(observable => {
                observer.next(observable);
                observer.complete();
            });
        });
    }

    private setUploadUrl(type) {
        this.uploader.options.url = IvApiUrl.IMAGES + '?type=' + type._id;
    }

    private onfileChange(event): Observable<IvImage> {
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
            }else{
                this.uploadAndGetImage(null).subscribe(image => {
                    observer.next(image);
                    observer.complete();
                });
            }
        });
    }

    private uploadAndGetImage(item): Observable<IvImage> {
        return Observable.create(observer => {
            if(item){
                item.upload();
                let interval = setInterval(() => {
                    if ( item._xhr != null && item._xhr.response && item._xhr.response != null && item._xhr.response !== '' ) {
                        observer.next(IvImage.createFormJson(JSON.parse(item._xhr.response).data));
                        item.remove();
                        clearInterval(interval);
                        observer.complete();
                    }
                }, 250);
            }else{
                observer.next(null);
                observer.complete();
            }
        });
    }
}
