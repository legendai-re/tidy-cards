import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Injectable }             from '@angular/core';
import { Observable }             from 'rxjs/Observable';
import { IvItem }                 from './tc-item.class';
import { IvApiUrl }               from '../tc-shared/tc-api-url';
import { IvItemUrl }              from './tc-item-url/tc-item-url.class';
import { IvItemYoutube }          from './tc-item-youtube/tc-item-youtube.class';
import { IvItemImage }            from './tc-item-image/tc-item-image.class';
import { IvItemTweet }            from './tc-item-tweet/tc-item-tweet.class';


import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class IvItemService {

    constructor (private http: Http) {}

    public getItems (params: URLSearchParams): Observable<IvItem[]> {
        return this.http.get(IvApiUrl.ITEMS, { search: params })
        .map(this.handleItems)
        .catch(this.handleError);
    }

    public postItem (item: IvItem): Observable<IvItem> {
        let body = JSON.stringify(item);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(IvApiUrl.ITEMS, body, options)
        .map(this.handleItem)
        .catch(this.handleError);
    }

    public putItem (item: IvItem): Observable<IvItem> {
        let body = JSON.stringify(item);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.put(IvApiUrl.ITEMS + '/' + item._id, body, options)
        .map(this.handleItem)
        .catch(this.handleError);
    }

    public postItemContent (url: String): Observable<any> {
        let body = JSON.stringify({url: url});
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(IvApiUrl.ITEMS_CONTENT_CREATE, body, options)
        .map(this.handleItemContent)
        .catch(this.handleError);
    }

    public deleteItem (_id: string): Observable<any> {
        return this.http.delete(IvApiUrl.ITEMS + '/' + _id);
    }

    private handleItems(res: Response) {
        let body = res.json();
        let cs = [];
        for (let key in body.data) {
            cs.push(IvItem.createFormJson(body.data[key]));
        };
        return cs;
    }

    private handleItem(res: Response) {
        let body = res.json();
        return IvItem.createFormJson(body.data) || {};
    }

    private handleItemContent(res: Response) {
        let body = res.json();
        if(body.error)
            return null;
        let itemType = body.itemType;
        if(!itemType)
            return null;
        switch (itemType.id) {
            case IvItem.ITEM_TYPES.URL.id:
                return {_content: IvItemUrl.createFormJson(body.data), type: IvItem.ITEM_TYPES.URL};
            case IvItem.ITEM_TYPES.TWEET.id:
                return {_content: IvItemTweet.createFormJson(body.data), type: IvItem.ITEM_TYPES.TWEET};
            case IvItem.ITEM_TYPES.IMAGE.id:
                return {_content: IvItemImage.createFormJson(body.data), type: IvItem.ITEM_TYPES.IMAGE};
            case IvItem.ITEM_TYPES.YOUTUBE.id:
                return {_content: IvItemYoutube.createFormJson(body.data), type: IvItem.ITEM_TYPES.YOUTUBE};
            default:
                return null
        }
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}
