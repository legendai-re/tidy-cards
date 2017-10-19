import { Component, Input } from '@angular/core';
import { TcItemUrl } from './tc-item-url.class';
import { TcApiUrl }  from '../../tc-shared/tc-api-url';

@Component({
    selector: 'tc-item-url',
    templateUrl: 'tc-item-url.component.html',
    styleUrls: ['../tc-item.component.scss', 'tc-item-url.component.scss']
})

export class TcItemUrlComponent {

    @Input() itemUrl: TcItemUrl;

    constructor() {
    }

    public getImageProxyUrl(url){
    	return TcApiUrl.IMAGES + '?url=' + encodeURIComponent(url);
    }
}
