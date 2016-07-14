import { User }     from '../user/user.class';
import { Image }    from '../image/image.class';

export class Collection {

    public _id: string;
    public createdAt: Date;
    public updatedAt: Date;
    public title: string;
    public color: string;
    public _author: User;
    public _thumbnail: Image;
    public visibility: number;

    constructor(_id?: string, createdAt?: Date | string, updatedAt?: Date | string, title?: string, color?: string, _author?: User, _thumbnail?: Image, visibility?: number) {
        this._id = _id;
        this.createdAt = typeof createdAt === 'string' ? new Date(createdAt) : createdAt;
        this.updatedAt = typeof updatedAt === 'string' ? new Date(updatedAt) : updatedAt;
        this.title = title;
        this.color = color;
        this._author = _author;
        this._thumbnail = _thumbnail;
        this.visibility = visibility;
    }

  public static get VISIBILITY() { return require('../../../server/models/collection/visibility.json'); ; }

  public static createFormJson(obj) {
    return new Collection(
      obj._id,
      obj.createdAt,
      obj.updatedAt,
      obj.title,
      obj.color,
      User.createFormJson(obj._author),
      Image.createFormJson(obj._thumbnail),
      obj.visibility
      );
  }

}
