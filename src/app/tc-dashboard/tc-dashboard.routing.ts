import { IvDashboardComponent } from './tc-dashboard.component';
import { GrantedUser }          from '../tc-auth/tc-auth.guard';

export const IvDashboardRoutes = [
{ path: 'dashboard', component: IvDashboardComponent, canActivate: [GrantedUser] }
];
