export class AppSettings {   

	public static get LOGIN(): string { return 'auth/login'; }
	public static get LOGOUT(): string { return 'auth/logout'; }
	public static get CURRENT_USER(): string { return 'auth/currentuser'; }
	public static get ROLES(): string { return 'auth/roles'; }

	public static get USERS(): string { return 'api/users' ; }

}
