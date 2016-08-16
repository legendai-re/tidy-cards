import { RouterConfig } from '@angular/router';
import { IvSearchComponent } from './iv-search.component';
import { GrantedUser } from '../iv-auth/iv-auth.guard';

export const IvSearchRoutes: RouterConfig = [
{ path: 'search/:q', component: IvSearchComponent },
{ path: 'search', component: IvSearchComponent },
];
