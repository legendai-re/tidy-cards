import { GrantedUser }          from '../tc-auth/tc-auth.guard';
import { IvUserComponent }    from './tc-user.component';
import { IvConfirmEmailComponent } from './tc-confirm-email/tc-confirm-email.component';

export const IvUserRoutes = [
{ path: ':user_id', component: IvUserComponent },
{ path: 'accounts/confirm_email/:confirm_token', component: IvConfirmEmailComponent, canActivate: [GrantedUser] }
];
