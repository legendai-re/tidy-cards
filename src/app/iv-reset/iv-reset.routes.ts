import { RouterConfig } from '@angular/router';
import { IvResetInitiateComponent } from './iv-reset-initiate/iv-reset-initiate.component';
import { IvResetCompleteComponent } from './iv-reset-complete/iv-reset-complete.component';
import { GrantedUser } from '../iv-auth/iv-auth.guard';

export const IvResetRoutes: RouterConfig = [
{ path: 'reset/initiate', component: IvResetInitiateComponent },
{ path: 'reset/complete/:reset_token', component: IvResetCompleteComponent }
];
