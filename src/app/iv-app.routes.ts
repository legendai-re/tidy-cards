import { Routes, RouterModule } from '@angular/router';

import { HomeGuard }                       from './iv-auth/iv-auth.guard';
import { IvAppComponent }                  from './iv-app.component';
import { IvDiscoverRoutes }                from './iv-discover/iv-discover.routes';
import { IvDashboardRoutes }               from './iv-dashboard/iv-dashboard.routes';
import { IvCollectionRoutes }              from './iv-collection/iv-collection.routes';
import { IvAdminRoutes }                   from './iv-admin/iv-admin.routes';
import { IvAuthRoutes, authProviders }     from './iv-auth/iv-auth.routes';
import { IvUserRoutes }                    from './iv-user/iv-user.routes';
import { IvResetRoutes }                   from './iv-reset/iv-reset.routes';
import { IvSearchRoutes }                  from './iv-search/iv-search.routes';

const appRoutes: Routes = [
    ...IvDiscoverRoutes,
    ...IvDashboardRoutes,
    ...IvCollectionRoutes,
    ...IvSearchRoutes,
    ...IvAdminRoutes,
    ...IvAuthRoutes,
    ...IvUserRoutes,
    ...IvResetRoutes,
    { path: '', component: IvAppComponent, canActivate: [HomeGuard] },
    { path: '**', component: IvAppComponent, canActivate: [HomeGuard] }
];

export const appRoutingProviders: any[] = [
    authProviders
];

export const routing = RouterModule.forRoot(appRoutes);
