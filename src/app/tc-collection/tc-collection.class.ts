import { IvUser }     from '../tc-user/tc-user.class';
import { IvImage }    from '../tc-image/tc-image.class';
import { IvItem }     from '../tc-item/tc-item.class';
import { IvStar }     from '../tc-star/tc-star.class';

export class IvCollection {

    public _id: string;
    public createdAt: Date;
    public updatedAt: Date;
    public title: string;
    public color: string;
    public _author: IvUser;
    public _thumbnail: IvImage;
    public visibility;
    public itemsCount: number;
    public bio: string;
    public _star: IvStar;
    public starsCount: number;
    public isFeatured: boolean;
    public isOnDiscover: boolean;
    public position: number;
    public _parent: string;
    public depth: number;
    public _parents: IvCollection[];

    public updatePosition: boolean;
    public _items: IvItem[];

    constructor(
        _id?: string,
        createdAt?: Date | string,
        updatedAt?: Date | string,
        title?: string,
        color?: string,
        _author?: IvUser,
        _thumbnail?: IvImage,
        visibility?: any,
        itemsCount?: number,
        bio?: string,
        _star?: IvStar,
        starsCount?: number,
        isFeatured?: boolean,
        isOnDiscover?: boolean,
        position?: number,
        _parent?: string,
        depth?: number,
        _parents?: IvCollection[]) {
        this._id = _id;
        this.createdAt = typeof createdAt === 'string' ? new Date(createdAt) : createdAt;
        this.updatedAt = typeof updatedAt === 'string' ? new Date(updatedAt) : updatedAt;
        this.title = title;
        this.color = color;
        this._author = _author;
        this._thumbnail = _thumbnail;
        this.visibility = typeof visibility === 'string' ? IvCollection.VISIBILITY[visibility] : visibility;
        this.itemsCount = itemsCount;
        this.bio = bio;
        this._star = _star;
        this.starsCount = starsCount;
        this.isFeatured = isFeatured;
        this.isOnDiscover = isOnDiscover;
        this.position = position;
        this._parent = _parent;
        this.depth = depth;
        this._parents = _parents;
    }

    public static get VISIBILITY() { return require('../../../server/models/collection/visibility.json');}

    public static createFormJson(obj) {
        if(!obj)
            return null;
        return new IvCollection(
            obj._id,
            obj.createdAt,
            obj.updatedAt,
            obj.title,
            obj.color,
            IvUser.createFormJson(obj._author),
            IvImage.createFormJson(obj._thumbnail),
            obj.visibility,
            obj.itemsCount,
            obj.bio,
            IvStar.createFormJson(obj._star),
            obj.starsCount,
            obj.isFeatured,
            obj.isOnDiscover,
            obj.position,
            obj._parent,
            obj.depth,
            IvCollection.createParentsFromJson(obj)
            );
    }

    public static createParentsFromJson(obj): IvCollection[]{
        let parents = [];
        for(let i in obj._parents)
            parents.push(IvCollection.createFormJson(obj._parents[i]));
        parents.sort(function(a, b){
            if(a.depth < b.depth) return -1;
            if(a.depth > b.depth) return 1;
            return 0;
        });
        return parents;
    }

}
