import { provideRouter, RouterConfig } from '@angular/router';

import { HomeGuard }        from './auth/auth.guard';
import { AppComponent }		from './app.component';
import { DiscoverRoutes } 	from './discover/discover.routes';
import { DashboardRoutes } 	from './dashboard/dashboard.routes';
import { CollectionRoutes } from './collection/collection.routes';
import { AdminRoutes } 		from './admin/admin.routes';
import { LoginRoutes, 
		 AUTH_PROVIDERS } 	from './auth/auth.routes';

export const routes: RouterConfig = [
	...DiscoverRoutes,
	...DashboardRoutes,
	...CollectionRoutes,
	...AdminRoutes,
	...LoginRoutes,
	{ path: '', component: AppComponent, canActivate: [HomeGuard] },
    { path: '**', component: AppComponent, canActivate: [HomeGuard] }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
  AUTH_PROVIDERS
];