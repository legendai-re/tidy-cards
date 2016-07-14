export class User {

  public _id: string;
  public createdAt: Date;
  public updatedAt: Date;
  public username: string;
  public name: string;
  public email: string;
  public password: string;
  public roles: string[];
  public bio: string;

  constructor(
    _id?: string,
    createdAt?: Date | string,
    updatedAt?: Date | string,
    username?: string,
    name?: string,
    email?: string,
    password?: string,
    roles?: string[],
    bio?: string) {
    this._id = _id;
    this.createdAt = typeof createdAt === 'string' ? new Date(createdAt) : createdAt;
    this.updatedAt = typeof updatedAt === 'string' ? new Date(updatedAt) : updatedAt;
    this.username = username;
    this.name = name;
    this.email = email;
    this.password = password;
    this.roles = roles;
    this.bio = bio;
  }

  public static createFormJson(obj) {
    return new User(
      obj._id,
      obj.createdAt,
      obj.updatedAt,
      obj.username,
      obj.name,
      obj.email,
      obj.password,
      obj.roles,
      obj.bio
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
