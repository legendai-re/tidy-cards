import { RouterConfig }     from '@angular/router';
import { IvUserComponent }    from './iv-user.component';
import { IvConfirmEmailComponent } from './iv-confirm-email/iv-confirm-email.component';
import { GrantedUser }          from '../iv-auth/iv-auth.guard';

export const IvUserRoutes: RouterConfig = [
{ path: ':user_id', component: IvUserComponent },
{ path: 'accounts/confirm_email/:confirm_token', component: IvConfirmEmailComponent, canActivate: [GrantedUser] }
];
