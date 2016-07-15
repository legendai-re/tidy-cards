import { RouterConfig }       from '@angular/router';
import { GrantedAdmin }       from '../iv-auth/iv-auth.guard';
import { IvAdminHomeComponent } from './iv-admin-home.component';

export const IvAdminRoutes: RouterConfig = [
{ path: 'admin',  component: IvAdminHomeComponent, canActivate: [GrantedAdmin] }
];
