import { Component, Input } from '@angular/core';
import { TcItemImage } from './tc-item-image.class';
import { TcApiUrl }  from '../../tc-shared/tc-api-url';

@Component({
    selector: 'tc-item-image',
    templateUrl: 'tc-item-image.component.html',
    styleUrls: ['../tc-item.component.scss', 'tc-item-image.component.scss']
})

export class TcItemImageComponent {

    @Input() itemImage: TcItemImage;

    constructor() {
    }

    public getImageProxyUrl(url){
    	return TcApiUrl.IMAGES + '?url=' + encodeURIComponent(url);
    }
}
