import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { HttpModule } from '@angular/http';

import { IvAppComponent }               from './iv-app.component';
import { routing, appRoutingProviders } from './iv-app.routes';

//Components
import { IvAdminFeaturedComponent } from './iv-admin/iv-admin-featured.component';
import { IvAdminHomeComponent }     from './iv-admin/iv-admin-home.component';

import { IvAuthComponent }   from './iv-auth/iv-auth.component';
import { IvSigninComponent } from './iv-auth/iv-signin.component';
import { IvSignupComponent } from './iv-auth/iv-signup.component';
import { IvLogoutComponent } from './iv-auth/iv-logout.component';

import { IvCollectionModule }     from './iv-collection/iv-collection.module';
import { IvItemModule }           from './iv-item/iv-item.module';
import { IvSharedModule }         from './iv-shared/iv-shared.module';
import { IvUserModule }           from './iv-user/iv-user.module';
import { IvHeaderModule }         from './iv-header/iv-header.module';
import { IvSearchModule }         from './iv-search/iv-search.module';

import { IvDashboardComponent }      from './iv-dashboard/iv-dashboard.component';

import { IvDiscoverComponent }       from './iv-discover/iv-discover.component';

import { IvResetCompleteComponent } from './iv-reset/iv-reset-complete/iv-reset-complete.component';
import { IvResetInitiateComponent } from './iv-reset/iv-reset-initiate/iv-reset-initiate.component';

//Services
import { IvUserService }       from './iv-user/iv-user.service';
import { IvImgUploadService }  from './iv-image/iv-image-upload.service';
import { IvAuthService }       from './iv-auth/iv-auth.service';
import { IvHeaderService }     from './iv-header/iv-header.service';
import { IvSearchService }     from './iv-search/iv-search.service';
import { IvResetService }      from './iv-reset/iv-reset.service';
import { IvLanguageService }   from './iv-language/iv-language.service';
import { IvCollectionService } from './iv-collection/iv-collection.service';
import { IvStarService }       from './iv-star/iv-star.service';
import { IvItemService }       from './iv-item/iv-item.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        IvSharedModule,
        IvItemModule,
        IvCollectionModule,
        IvUserModule,
        IvHeaderModule,
        IvSearchModule,
        routing,
    ],
    declarations: [
        IvAppComponent,

        IvAdminFeaturedComponent,
        IvAdminHomeComponent,

        IvAuthComponent,
        IvSigninComponent,
        IvSignupComponent,
        IvLogoutComponent,

        IvDashboardComponent,

        IvDiscoverComponent,

        IvResetCompleteComponent,
        IvResetInitiateComponent,
    ],
    providers: [
        appRoutingProviders,
        IvCollectionService,
        IvStarService,
        IvItemService,
        IvUserService,
        IvImgUploadService,
        IvAuthService,
        IvHeaderService,
        IvSearchService,
        IvResetService,
        IvLanguageService
    ],
    bootstrap: [IvAppComponent]
})
export class AppModule {
}
