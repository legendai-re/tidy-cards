import { RouterConfig }     from '@angular/router';
import { IvUserComponent }    from './iv-user.component';

export const IvUserRoutes: RouterConfig = [
{ path: 'u/:user_id', component: IvUserComponent }
];
