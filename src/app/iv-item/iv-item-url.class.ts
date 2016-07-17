export class IvItemUrl {

    public _id: string;
    public createdAt: Date;
    public updatedAt: Date;
    public url: string;
    public image: string;
    public host: string;
    public title: string;
    public description: string;
    public author: string;
    public type: string;
    public site_name: string;

    constructor(
        _id?: string,
        createdAt?: Date | string,
        updatedAt?: Date | string,
        url?: string,
        image?: string,
        host?: string,
        title?: string,
        description?: string,
        author?: string,
        type?: string,
        site_name?: string) {
        this._id = _id;
        this.createdAt = typeof createdAt === 'string' ? new Date(createdAt) : createdAt;
        this.updatedAt = typeof updatedAt === 'string' ? new Date(updatedAt) : updatedAt;
        this.url = url;
        this.image = image;
        this.host = host;
        this.title = title;
        this.description = description;
        this.author = author;
        this.type = type;
        this.site_name = site_name;
    }

    public static createFormJson(obj) {
        if(!obj)
            return null;
        if(typeof obj === 'string'){
            var itemUrl = new IvItemUrl();
            itemUrl._id = obj;
            return itemUrl;
        }
        return new IvItemUrl(
            obj._id,
            obj.createdAt,
            obj.updatedAt,
            obj.url,
            obj.image,
            obj.host,
            obj.title,
            obj.description,
            obj.author,
            obj.type,
            obj.site_name
            );
    }
}
