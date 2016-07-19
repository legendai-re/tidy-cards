import { IvImage }    from '../iv-image/iv-image.class';

export class IvUser {

    public _id: string;
    public createdAt: Date;
    public updatedAt: Date;
    public username: string;
    public name: string;
    public email: string;
    public password: string;
    public roles: string[];
    public bio: string;
    public _avatar: IvImage;
    public facebook: any;
    public twitter: any;

    constructor(
        _id?: string,
        createdAt?: Date | string,
        updatedAt?: Date | string,
        username?: string,
        name?: string,
        email?: string,
        password?: string,
        roles?: string[],
        bio?: string,
        _avatar?: IvImage,
        facebook?: any,
        twitter?: any) {
        this._id = _id;
        this.createdAt = typeof createdAt === 'string' ? new Date(createdAt) : createdAt;
        this.updatedAt = typeof updatedAt === 'string' ? new Date(updatedAt) : updatedAt;
        this.username = username;
        this.name = name;
        this.email = email;
        this.password = password;
        this.roles = roles;
        this.bio = bio;
        this._avatar = _avatar;
        this.facebook = facebook;
        this.twitter = twitter;
    }

    public static createFormJson(obj) {
        return new IvUser(
            obj._id,
            obj.createdAt,
            obj.updatedAt,
            obj.username,
            obj.name,
            obj.email,
            obj.password,
            obj.roles,
            obj.bio,
            IvImage.createFormJson(obj._avatar),
            obj.facebook,
            obj.twitter
            );
    }

    isGranted(role: string) {
        let roles = require('../../../server/security/roles.json');
        if (this.haveRole(role)) {
            return true;
        }
        return this.checkRole(this, role, roles);
    }

    haveRole(role) {
        return this.roles.indexOf(role) > -1;
    }

    private checkRole(user, toFound, roles) {
        for (let role in roles) {
            if ((roles[role].indexOf(toFound) > -1)) {
                if (user.haveRole(role)) {
                    return true;
                } else {
                    return this.checkRole(user, role, roles);
                }
            }
        }
        return false;
    }
}
