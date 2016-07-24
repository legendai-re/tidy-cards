import { RouterConfig }       from '@angular/router';
import { GrantedAdmin }       from '../iv-auth/iv-auth.guard';
import { IvAdminHomeComponent } from './iv-admin-home.component';
import { IvAdminFeaturedComponent } from './iv-admin-featured.component';

export const IvAdminRoutes: RouterConfig = [
{ path: 'admin',  component: IvAdminHomeComponent, canActivate: [GrantedAdmin] },
{ path: 'admin/featured',  component: IvAdminFeaturedComponent, canActivate: [GrantedAdmin] }
];
