import { RouterConfig }     	from '@angular/router';
import { DiscoverComponent }	from './discover.component';
import { GrantedUser }        from '../auth/auth.guard';

export const DiscoverRoutes: RouterConfig = [
  { path: 'discover', component: DiscoverComponent, canActivate: [GrantedUser] }
];
