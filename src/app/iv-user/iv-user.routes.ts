import { RouterConfig }     from '@angular/router';
import { IvUserComponent }    from './iv-user.component';
import { IvUserConfirmEmailComponent } from './iv-user-confirm-email/iv-user-confirm-email.component';
import { GrantedUser }          from '../iv-auth/iv-auth.guard';

export const IvUserRoutes: RouterConfig = [
{ path: ':user_id', component: IvUserComponent },
{ path: 'accounts/confirm_email/:confirm_token', component: IvUserConfirmEmailComponent, canActivate: [GrantedUser] }
];
