import { GrantedUser }       from './iv-auth.guard';
import { GrantedAnonymous }  from './iv-auth.guard';
import { GrantedAdmin }      from './iv-auth.guard';
import { HomeGuard }         from './iv-auth.guard';
import { IvAuthService }     from './iv-auth.service';
import { IvAuthComponent }   from './iv-auth.component';
import { IvLogoutComponent } from './iv-logout.component';

export const IvAuthRoutes = [
{ path: 'signin', component: IvAuthComponent, canActivate: [GrantedAnonymous] },
{ path: 'logout', component: IvLogoutComponent, canActivate: [GrantedUser] }
];

export const IV_AUTH_PROVIDERS = [GrantedUser, GrantedAdmin, GrantedAnonymous, IvAuthService, HomeGuard];
