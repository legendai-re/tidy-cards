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

import { IvCollectionCardComponent }     from './iv-collection/iv-collection-card/iv-collection-card.component';
import { IvCollectionCreateComponent }   from './iv-collection/iv-collection-create/iv-collection-create.component';
import { IvCollectionMeComponent }       from './iv-collection/iv-collection-me/iv-collection-me.component';
import { IvCollectionDetailComponent }   from './iv-collection/iv-collection-detail/iv-collection-detail.component';
import { IvCollectionFeaturedComponent } from './iv-collection/iv-collection-featured/iv-collection-featured.component';
import { IvCollectionLastComponent }     from './iv-collection/iv-collection-last/iv-collection-last.component';
import { IvCollectionPopularComponent }  from './iv-collection/iv-collection-popular/iv-collection-popular.component';

import { IvDashboardComponent }      from './iv-dashboard/iv-dashboard.component';

import { IvDiscoverComponent }       from './iv-discover/iv-discover.component';

import { IvHeaderComponent }         from './iv-header/iv-header.component';

import { IvItemComponent }        from './iv-item/iv-item.component';
import { IvItemCreateComponent }  from './iv-item/iv-item-create/iv-item-create.component';
import { IvItemImageComponent }   from './iv-item/iv-item-image/iv-item-image.component';
import { IvItemTweetComponent }   from './iv-item/iv-item-tweet/iv-item-tweet.component';
import { IvItemUrlComponent }     from './iv-item/iv-item-url/iv-item-url.component';
import { IvItemYoutubeComponent } from './iv-item/iv-item-youtube/iv-item-youtube.component';

import { IvResetCompleteComponent } from './iv-reset/iv-reset-complete/iv-reset-complete.component';
import { IvResetInitiateComponent } from './iv-reset/iv-reset-initiate/iv-reset-initiate.component';

import { IvSearchComponent }       from './iv-search/iv-search.component';
import { IvSearchHeaderComponent } from './iv-search/iv-search-header.component';

import { IvUserComponent }         from './iv-user/iv-user.component';
import { IvConfirmEmailComponent } from './iv-user/iv-confirm-email/iv-confirm-email.component';
import { IvUserPrivateComponent }  from './iv-user/iv-user-private/iv-user-private.component';
import { IvUserPublicComponent }   from './iv-user/iv-user-public/iv-user-public.component';

import { IvSortableDirective }     from'./iv-shared/iv-sortable.directive';

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
        routing,
        HttpModule
    ],
    declarations: [
        IvAppComponent,

        IvCollectionCardComponent,
        IvCollectionCreateComponent,
        IvCollectionMeComponent,
        IvCollectionDetailComponent,
        IvCollectionFeaturedComponent,
        IvCollectionLastComponent,
        IvCollectionPopularComponent,

        IvAdminFeaturedComponent,
        IvAdminHomeComponent,

        IvAuthComponent,
        IvSigninComponent,
        IvSignupComponent,
        IvLogoutComponent,

        IvDashboardComponent,

        IvDiscoverComponent,

        IvHeaderComponent,

        IvItemComponent,
        IvItemCreateComponent,
        IvItemImageComponent,
        IvItemTweetComponent,
        IvItemUrlComponent,
        IvItemYoutubeComponent,

        IvResetCompleteComponent,
        IvResetInitiateComponent,

        IvSearchComponent,
        IvSearchHeaderComponent,

        IvUserComponent,
        IvConfirmEmailComponent,
        IvUserPrivateComponent,
        IvUserPublicComponent,

        IvSortableDirective
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
