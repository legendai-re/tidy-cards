import { Routes, RouterModule } from '@angular/router';

import { HomeGuard }                   from './tc-auth/tc-auth.guard';
import { IvAppComponent }              from './tc-app.component';
import { IvDiscoverRoutes }            from './tc-discover/tc-discover.routing';
import { IvDashboardRoutes }           from './tc-dashboard/tc-dashboard.routing';
import { IvCollectionRoutes }          from './tc-collection/tc-collection.routing';
import { IvAdminRoutes }               from './tc-admin/tc-admin.routing';
import { IvAuthRoutes, authProviders } from './tc-auth/tc-auth.routing';
import { IvUserRoutes }                from './tc-user/tc-user.routing';
import { IvResetRoutes }               from './tc-reset/tc-reset.routing';
import { IvSearchRoutes }              from './tc-search/tc-search.routing';
import { IvPageRoutes }                from './tc-page/tc-page.routing';

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
