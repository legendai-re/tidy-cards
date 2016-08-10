import { provideRouter, RouterConfig } from '@angular/router';

import { HomeGuard }                       from './iv-auth/iv-auth.guard';
import { IvAppComponent }                  from './iv-app.component';
import { IvDiscoverRoutes }                from './iv-discover/iv-discover.routes';
import { IvDashboardRoutes }               from './iv-dashboard/iv-dashboard.routes';
import { IvCollectionRoutes }              from './iv-collection/iv-collection.routes';
import { IvAdminRoutes }                   from './iv-admin/iv-admin.routes';
import { IvAuthRoutes, IV_AUTH_PROVIDERS } from './iv-auth/iv-auth.routes';
import { IvUserRoutes }                    from './iv-user/iv-user.routes';
import { IvResetRoutes }                   from './iv-reset/iv-reset.routes';

export const routes: RouterConfig = [
    ...IvDiscoverRoutes,
    ...IvDashboardRoutes,
    ...IvCollectionRoutes,
    ...IvAdminRoutes,
    ...IvAuthRoutes,
    ...IvUserRoutes,
    ...IvResetRoutes,
    { path: '', component: IvAppComponent, canActivate: [HomeGuard] },
    { path: '**', component: IvAppComponent, canActivate: [HomeGuard] }
];

export const IV_APP_ROUTER_PROVIDERS = [
provideRouter(routes),
IV_AUTH_PROVIDERS
];
