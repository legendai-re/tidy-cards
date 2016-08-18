import { IvItemUrl }     from './iv-item-url/iv-item-url.class';
import { IvItemYoutube } from './iv-item-youtube/iv-item-youtube.class';
import { IvItemImage }   from './iv-item-image/iv-item-image.class';
import { IvItemTweet }   from './iv-item-tweet/iv-item-tweet.class';
import { IvCollection }  from '../iv-collection/iv-collection.class';

export class IvItem {

    public _id: string;
    public createdAt: Date;
    public updatedAt: Date;
    public description: string;
    public type: any;
    public _content: any;
    public _collection: string;
    public position: number;
    public updatePosition: boolean;

    constructor(
        _id?: string,
        createdAt?: Date | string,
        updatedAt?: Date | string,
        description?: string,
        type?: any,
        _content?: IvItemUrl | IvItemYoutube | IvItemImage | IvItemTweet | IvCollection,
        _collection?: string,
        position?: number) {
        this._id = _id;
        this.createdAt = typeof createdAt === 'string' ? new Date(createdAt) : createdAt;
        this.updatedAt = typeof updatedAt === 'string' ? new Date(updatedAt) : updatedAt;
        this.description = description;
        this.type = typeof type === 'string' ? IvItem.ITEM_TYPES[type] : type;
        this._content = _content;
        this._collection = _collection;
        this.position = position;
    }

    public static get ITEM_TYPES() { return require('../../../server/models/item/itemTypes.json');}

    public static createFormJson(obj) {
        if(!obj)
            return null;
        return new IvItem(
            obj._id,
            obj.createdAt,
            obj.updatedAt,
            obj.description,
            obj.type,
            IvItem.getContent(obj),
            obj._collection,
            obj.position
            );
    }

    public static getContent(obj): any{
        var type = typeof obj.type === 'string' ? IvItem.ITEM_TYPES[obj.type] : obj.type;
        switch (type.id) {
            case IvItem.ITEM_TYPES.URL.id:
                return IvItemUrl.createFormJson(obj._content);
            case IvItem.ITEM_TYPES.YOUTUBE.id:
                return IvItemYoutube.createFormJson(obj._content);
            case IvItem.ITEM_TYPES.IMAGE.id:
                return IvItemImage.createFormJson(obj._content);
            case IvItem.ITEM_TYPES.TWEET.id:
                return IvItemTweet.createFormJson(obj._content);
            case IvItem.ITEM_TYPES.COLLECTION.id:
                return IvCollection.createFormJson(obj._content);
            default:
                return null;
        }

    }
}
