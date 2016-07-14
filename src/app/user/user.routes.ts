import { RouterConfig }     from '@angular/router';
import { UserComponent }    from './user.component';

export const UserRoutes: RouterConfig = [
  { path: 'u/:user_id', component: UserComponent }
];
