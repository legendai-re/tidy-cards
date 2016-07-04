import { GrantedUser }      from './auth.guard';
import { GrantedAnonymous }	from './auth.guard';
import { GrantedAdmin }		from './auth.guard';
import { AuthService }    	from './auth.service';
import { LoginComponent }   from './login.component';
import { SignupComponent }  from './signup.component';
import { LogoutComponent }  from './logout.component';

export const LoginRoutes = [
  	{ path: 'login', component: LoginComponent, canActivate: [GrantedAnonymous] },
  	{ path: 'logout', component: LogoutComponent, canActivate: [GrantedUser] },
  	{ path: 'signup', component: SignupComponent, canActivate: [GrantedAnonymous] }  	
];

export const AUTH_PROVIDERS = [GrantedUser, GrantedAdmin, GrantedAnonymous, AuthService];