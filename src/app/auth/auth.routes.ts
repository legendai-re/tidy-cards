import { GrantedUser }      from './auth.guard';
import { GrantedAnonymous }	from './auth.guard';
import { GrantedAdmin }		from './auth.guard';
import { HomeGuard }		from './auth.guard';
import { AuthService }    	from './auth.service';
import { SigninComponent }   from './signin.component';
import { SignupComponent }  from './signup.component';
import { LogoutComponent }  from './logout.component';

export const AuthRoutes = [
{ path: 'signin', component: SigninComponent, canActivate: [GrantedAnonymous] },
{ path: 'logout', component: LogoutComponent, canActivate: [GrantedUser] },
{ path: 'signup', component: SignupComponent, canActivate: [GrantedAnonymous] }
];

export const AUTH_PROVIDERS = [GrantedUser, GrantedAdmin, GrantedAnonymous, AuthService, HomeGuard];
