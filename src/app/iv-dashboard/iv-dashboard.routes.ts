import { IvDashboardComponent } from './iv-dashboard.component';
import { GrantedUser }          from '../iv-auth/iv-auth.guard';

export const IvDashboardRoutes = [
{ path: 'dashboard', component: IvDashboardComponent, canActivate: [GrantedUser] }
];
