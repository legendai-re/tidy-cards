import { RouterConfig }       from '@angular/router';
import { GrantedAdmin }       from '../auth/auth.guard';
import { AdminHomeComponent } from './admin-home.component';

export const AdminRoutes: RouterConfig = [
{ path: 'admin',  component: AdminHomeComponent, canActivate: [GrantedAdmin] }
];
