import { RouterConfig }         from '@angular/router';
import { IvDiscoverComponent }    from './iv-discover.component';
import { GrantedUser }        from '../iv-auth/iv-auth.guard';

export const IvDiscoverRoutes: RouterConfig = [
{ path: 'discover', component: IvDiscoverComponent }
];
