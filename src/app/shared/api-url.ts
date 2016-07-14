export class ApiUrl {

    public static get LOGIN(): string { return 'auth/login'; }
    public static get LOGOUT(): string { return 'auth/logout'; }
    public static get SIGNUP(): string { return 'auth/signup'; }
    public static get CURRENT_USER(): string { return 'auth/currentuser'; }
    public static get ROLES(): string { return 'auth/roles'; }

    public static get USERS(): string { return 'api/users' ; }
    public static get IMAGES(): string { return 'api/images' ; }
    public static get COLLECTIONS(): string { return 'api/collections' ; }

}
