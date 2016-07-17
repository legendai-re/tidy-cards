import { IvItemUrl }     from './iv-item-url.class';
import { IvItemYoutube }     from './iv-item-youtube.class';

export class IvItem {

    public _id: string;
    public createdAt: Date;
    public updatedAt: Date;
    public description: string;
    public type: string;
    public _content: any;
    public _collection: string;

    constructor(
        _id?: string,
        createdAt?: Date | string,
        updatedAt?: Date | string,
        description?: string,
        type?: string,
        _content?: IvItemUrl | IvItemYoutube,
        _collection?: string) {
        this._id = _id;
        this.createdAt = typeof createdAt === 'string' ? new Date(createdAt) : createdAt;
        this.updatedAt = typeof updatedAt === 'string' ? new Date(updatedAt) : updatedAt;
        this.description = description;
        this.type = typeof type === 'string' ? IvItem.ITEM_TYPES[type] : type;
        this._content = _content;
        this._collection = _collection;
    }

    public static get ITEM_TYPES() { return require('../../../server/models/item/itemTypes.json');}

    public static createFormJson(obj) {
        return new IvItem(
            obj._id,
            obj.createdAt,
            obj.updatedAt,
            obj.description,
            obj.type,
            IvItem.getContent(obj),
            obj._collection
            );
    }

    public static getContent(obj){
        var type = typeof obj.type === 'string' ? IvItem.ITEM_TYPES[obj.type] : type;
        switch (type.id) {
            case IvItem.ITEM_TYPES.URL.id:
                return IvItemUrl.createFormJson(obj._content);
            case IvItem.ITEM_TYPES.YOUTUBE.id:
                return IvItemYoutube.createFormJson(obj._content);
            default:
                return null;
        }

    }
}
