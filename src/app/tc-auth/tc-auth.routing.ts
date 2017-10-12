import { GrantedUser }       from './tc-auth.guard';
import { GrantedAnonymous }  from './tc-auth.guard';
import { GrantedAdmin }      from './tc-auth.guard';
import { HomeGuard }         from './tc-auth.guard';
import { IvAuthService }     from './tc-auth.service';
import { IvAuthComponent }   from './tc-auth.component';
import { IvLogoutComponent } from './tc-logout.component';

export const IvAuthRoutes = [
{ path: 'signin', component: IvAuthComponent, canActivate: [GrantedAnonymous] },
{ path: 'logout', component: IvLogoutComponent, canActivate: [GrantedUser] }
];

export const authProviders = [
  GrantedUser,
  GrantedAdmin,
  GrantedAnonymous,
  IvAuthService,
  HomeGuard
];

