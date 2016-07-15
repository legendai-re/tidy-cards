import { GrantedUser }      from './iv-auth.guard';
import { GrantedAnonymous } from './iv-auth.guard';
import { GrantedAdmin }     from './iv-auth.guard';
import { HomeGuard }        from './iv-auth.guard';
import { IvAuthService }      from './iv-auth.service';
import { IvSigninComponent }  from './iv-signin.component';
import { IvSignupComponent }  from './iv-signup.component';
import { IvLogoutComponent }  from './iv-logout.component';

export const IvAuthRoutes = [
{ path: 'signin', component: IvSigninComponent, canActivate: [GrantedAnonymous] },
{ path: 'logout', component: IvLogoutComponent, canActivate: [GrantedUser] },
{ path: 'signup', component: IvSignupComponent, canActivate: [GrantedAnonymous] }
];

export const IV_AUTH_PROVIDERS = [GrantedUser, GrantedAdmin, GrantedAnonymous, IvAuthService, HomeGuard];
