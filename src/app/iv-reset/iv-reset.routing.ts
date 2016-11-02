import { IvResetInitiateComponent } from './iv-reset-initiate/iv-reset-initiate.component';
import { IvResetCompleteComponent } from './iv-reset-complete/iv-reset-complete.component';

export const IvResetRoutes = [
{ path: 'reset/initiate', component: IvResetInitiateComponent },
{ path: 'reset/complete/:reset_token', component: IvResetCompleteComponent }
];
