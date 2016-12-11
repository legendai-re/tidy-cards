import { Routes, RouterModule } from '@angular/router';

import { HomeGuard }                   from './iv-auth/iv-auth.guard';
import { IvAppComponent }              from './iv-app.component';
import { IvDiscoverRoutes }            from './iv-discover/iv-discover.routing';
import { IvDashboardRoutes }           from './iv-dashboard/iv-dashboard.routing';
import { IvCollectionRoutes }          from './iv-collection/iv-collection.routing';
import { IvAdminRoutes }               from './iv-admin/iv-admin.routing';
import { IvAuthRoutes, authProviders } from './iv-auth/iv-auth.routing';
import { IvUserRoutes }                from './iv-user/iv-user.routing';
import { IvResetRoutes }               from './iv-reset/iv-reset.routing';
import { IvSearchRoutes }              from './iv-search/iv-search.routing';
import { IvPageRoutes }                from './iv-page/iv-page.routing';

const appRoutes: Routes = [
    ...IvDiscoverRoutes,
    ...IvDashboardRoutes,
    ...IvCollectionRoutes,
    ...IvSearchRoutes,
    ...IvPageRoutes,
    ...IvAdminRoutes,
    ...IvAuthRoutes,
    ...IvResetRoutes,
    ...IvUserRoutes,
    { path: '', component: IvAppComponent, canActivate: [HomeGuard] },
    { path: '**', component: IvAppComponent, canActivate: [HomeGuard] }
];

export const appRoutingProviders: any[] = [
    authProviders
];

export const routing = RouterModule.forRoot(appRoutes);
