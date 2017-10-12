import { GrantedAdmin }       from '../tc-auth/tc-auth.guard';
import { IvAdminHomeComponent } from './tc-admin-home.component';
import { IvAdminFeaturedComponent } from './tc-admin-featured.component';

export const IvAdminRoutes = [
{ path: 'admin',  component: IvAdminHomeComponent, canActivate: [GrantedAdmin] },
{ path: 'admin/featured',  component: IvAdminFeaturedComponent, canActivate: [GrantedAdmin] }
];
