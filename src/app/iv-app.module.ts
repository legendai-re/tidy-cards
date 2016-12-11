import { NgModule }      from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { HttpModule } from '@angular/http';

import { IvAppComponent }               from './iv-app.component';
import { routing, appRoutingProviders } from './iv-app.routing';

//Modules
import { IvAuthModule }           from './iv-auth/iv-auth.module';
import { IvCollectionModule }     from './iv-collection/iv-collection.module';
import { IvCollectionCardModule } from './iv-collection/iv-collection-card/iv-collection-card.module';
import { IvCollectionCreateModule } from './iv-collection/iv-collection-create/iv-collection-create.module';
import { IvHeaderModule }         from './iv-header/iv-header.module';
import { IvItemModule }           from './iv-item/iv-item.module';
import { IvPageModule }           from './iv-page/iv-page.module';
import { IvSearchModule }         from './iv-search/iv-search.module';
import { IvSharedModule }         from './iv-shared/iv-shared.module';
import { IvUserModule }           from './iv-user/iv-user.module';

//Components
import { IvAdminFeaturedComponent } from './iv-admin/iv-admin-featured.component';
import { IvAdminHomeComponent }     from './iv-admin/iv-admin-home.component';

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
import { IvBase64 }            from './iv-shared/iv-base64.service';

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
