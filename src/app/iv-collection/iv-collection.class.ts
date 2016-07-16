import { IvUser }     from '../iv-user/iv-user.class';
import { IvImage }    from '../iv-image/iv-image.class';

export class IvCollection {

    public _id: string;
    public createdAt: Date;
    public updatedAt: Date;
    public title: string;
    public color: string;
    public _author: IvUser;
    public _thumbnail: IvImage;
    public visibility;

    constructor(_id?: string, createdAt?: Date | string, updatedAt?: Date | string, title?: string, color?: string, _author?: IvUser, _thumbnail?: IvImage, visibility?) {
        this._id = _id;
        this.createdAt = typeof createdAt === 'string' ? new Date(createdAt) : createdAt;
        this.updatedAt = typeof updatedAt === 'string' ? new Date(updatedAt) : updatedAt;
        this.title = title;
        this.color = color;
        this._author = _author;
        this._thumbnail = _thumbnail;
        this.visibility = typeof updatedAt === 'string' ? IvCollection.VISIBILITY[visibility] : visibility;
    }

    public static get VISIBILITY() { return require('../../../server/models/collection/visibility.json'); ; }

    public static createFormJson(obj) {
        return new IvCollection(
            obj._id,
            obj.createdAt,
            obj.updatedAt,
            obj.title,
            obj.color,
            IvUser.createFormJson(obj._author),
            IvImage.createFormJson(obj._thumbnail),
            obj.visibility
            );
    }

}
