import { NgModule }      from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { HttpModule } from '@angular/http';

import { IvAppComponent }               from './tc-app.component';
import { routing, appRoutingProviders } from './tc-app.routing';

//Modules
import { IvAuthModule }           from './tc-auth/tc-auth.module';
import { IvCollectionModule }     from './tc-collection/tc-collection.module';
import { IvCollectionCardModule } from './tc-collection/tc-collection-card/tc-collection-card.module';
import { IvCollectionCreateModule } from './tc-collection/tc-collection-create/tc-collection-create.module';
import { IvHeaderModule }         from './tc-header/tc-header.module';
import { IvItemModule }           from './tc-item/tc-item.module';
import { IvPageModule }           from './tc-page/tc-page.module';
import { IvSearchModule }         from './tc-search/tc-search.module';
import { IvSharedModule }         from './tc-shared/tc-shared.module';
import { IvUserModule }           from './tc-user/tc-user.module';

//Components
import { IvAdminFeaturedComponent } from './tc-admin/tc-admin-featured.component';
import { IvAdminHomeComponent }     from './tc-admin/tc-admin-home.component';

import { IvDashboardComponent }      from './tc-dashboard/tc-dashboard.component';

import { IvDiscoverComponent }       from './tc-discover/tc-discover.component';

import { IvResetCompleteComponent } from './tc-reset/tc-reset-complete/tc-reset-complete.component';
import { IvResetInitiateComponent } from './tc-reset/tc-reset-initiate/tc-reset-initiate.component';

//Services
import { IvUserService }       from './tc-user/tc-user.service';
import { IvImgUploadService }  from './tc-image/tc-image-upload.service';
import { IvAuthService }       from './tc-auth/tc-auth.service';
import { IvHeaderService }     from './tc-header/tc-header.service';
import { IvSearchService }     from './tc-search/tc-search.service';
import { IvResetService }      from './tc-reset/tc-reset.service';
import { IvLanguageService }   from './tc-language/tc-language.service';
import { IvCollectionService } from './tc-collection/tc-collection.service';
import { IvStarService }       from './tc-star/tc-star.service';
import { IvItemService }       from './tc-item/tc-item.service';
import { IvBase64 }            from './tc-shared/tc-base64.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        IvAuthModule,
        IvCollectionModule,
        IvCollectionCardModule,
        IvCollectionCreateModule,
        IvHeaderModule,
        IvItemModule,
        IvPageModule,
        IvSearchModule,
        IvSharedModule,
        IvUserModule,
        routing,
    ],
    declarations: [
        IvAppComponent,
        IvAdminFeaturedComponent,
        IvAdminHomeComponent,
        IvDashboardComponent,
        IvDiscoverComponent,
        IvResetCompleteComponent,
        IvResetInitiateComponent,
    ],
    providers: [
        Title,
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
        IvLanguageService,
        IvBase64
    ],
    bootstrap: [IvAppComponent]
})
export class AppModule {
}
