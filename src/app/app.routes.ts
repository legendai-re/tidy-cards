import { provideRouter, RouterConfig } from '@angular/router';

import { HomeRoutes } 		from './home/home.routes';
import { CollectionRoutes } from './collection/collection.routes';
import { AdminRoutes } 		from './admin/admin.routes';
import { LoginRoutes, 
		 AUTH_PROVIDERS } 	from './auth/auth.routes';

export const routes: RouterConfig = [
	...HomeRoutes,
	...CollectionRoutes,
	...AdminRoutes,
	...LoginRoutes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
  AUTH_PROVIDERS
];