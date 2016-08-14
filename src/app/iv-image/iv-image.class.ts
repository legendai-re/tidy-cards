export class IvImage {

    public _id: string;
    public type;
    public mime: string;
    public baseUrl: string;

    constructor(_id?: string, type?: Object | string, mime?: string, baseUrl?: string) {
        let types = IvImage.getTypes();
        this._id = _id;
        this.type = typeof type === 'string' ? types[type] : type;
        this.mime = mime;
        this.baseUrl = baseUrl;
    }

    public static createFormJson(obj) {
        if (!obj) {
            return null;
        }

        return new IvImage(
            obj._id,
            obj.type,
            obj.mime,
            obj.baseUrl
            );
    }

    public static getTypes() {
        return require('../../../server/models/image/imageTypes.json');
    }

    public getPath(size: string) {
        if(!this.type)
            return;
        return this.baseUrl + '/' + this.type.path + '/s' + size + '/' + this._id + '.' + this.mime;
    }
}
