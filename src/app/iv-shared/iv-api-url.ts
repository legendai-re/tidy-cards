export class IvApiUrl {

    public static get LOGIN(): string { return 'auth/login'; }
    public static get LOGOUT(): string { return 'auth/logout'; }
    public static get SIGNUP(): string { return 'auth/signup'; }
    public static get CURRENT_USER(): string { return 'auth/currentuser'; }
    public static get ROLES(): string { return 'auth/roles'; }
    public static get UNLINK(): string { return 'auth/unlink'; }

    public static get USERS(): string { return 'api/users' ; }
    public static get VALID_USERNAME(): string { return 'api/users/helpers/valid-username' ; }
    public static get IMAGES(): string { return 'api/images' ; }
    public static get COLLECTIONS(): string { return 'api/collections' ; }
    public static get ITEMS(): string { return 'api/items' ; }
    public static get ITEMS_URL(): string { return 'api/items/url' ; }
    public static get STAR(): string { return 'api/stars' ; }

}
