export class IvItem {

    public _id: string;
    public createdAt: Date;
    public updatedAt: Date;
    public description: string;
    public type: string;

    constructor(
        _id?: string,
        createdAt?: Date | string,
        updatedAt?: Date | string,
        description?: string,
        type?: string) {
        this._id = _id;
        this.createdAt = typeof createdAt === 'string' ? new Date(createdAt) : createdAt;
        this.updatedAt = typeof updatedAt === 'string' ? new Date(updatedAt) : updatedAt;
        this.description = description;
        this.type = type;
    }

    public static createFormJson(obj) {
        return new IvItem(
            obj._id,
            obj.createdAt,
            obj.updatedAt,
            obj.description,
            obj.type
            );
    }
}
