import { IvResetInitiateComponent } from './tc-reset-initiate/tc-reset-initiate.component';
import { IvResetCompleteComponent } from './tc-reset-complete/tc-reset-complete.component';

export const IvResetRoutes = [
{ path: 'reset/initiate', component: IvResetInitiateComponent },
{ path: 'reset/complete/:reset_token', component: IvResetCompleteComponent }
];
