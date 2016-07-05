import { RouterConfig }     	from '@angular/router';
import { DashboardComponent }	from './dashboard.component';
import { GrantedUser }      	from '../auth/auth.guard';

export const DashboardRoutes: RouterConfig = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [GrantedUser] }  
];