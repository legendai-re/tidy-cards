import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';
import { RouterModule }       from '@angular/router';
import { IvSharedModule }     from '../tc-shared/tc-shared.module';
import { IvItemModule }       from '../tc-item/tc-item.module';
import { IvCollectionCardModule } from './tc-collection-card/tc-collection-card.module';
import { IvCollectionCreateModule } from './tc-collection-create/tc-collection-create.module';

import { IvCollectionMeComponent }       from './tc-collection-me/tc-collection-me.component';
import { IvCollectionStarredComponent }  from './tc-collection-starred/tc-collection-starred.component';
import { IvCollectionDetailComponent }   from './tc-collection-detail/tc-collection-detail.component';
import { IvCollectionFeaturedComponent } from './tc-collection-featured/tc-collection-featured.component';
import { IvCollectionLastComponent }     from './tc-collection-last/tc-collection-last.component';
import { IvCollectionPopularComponent }  from './tc-collection-popular/tc-collection-popular.component';

@NgModule({
  imports: [ RouterModule, CommonModule, FormsModule, IvSharedModule, IvItemModule, IvCollectionCardModule, IvCollectionCreateModule ],
  declarations: [
    IvCollectionMeComponent,
    IvCollectionStarredComponent,
    IvCollectionDetailComponent,
    IvCollectionFeaturedComponent,
    IvCollectionLastComponent,
    IvCollectionPopularComponent
  ],
  exports: [
    IvCollectionMeComponent,
    IvCollectionStarredComponent,
    IvCollectionDetailComponent,
    IvCollectionFeaturedComponent,
    IvCollectionLastComponent,
    IvCollectionPopularComponent
  ],
  providers: []
})
export class IvCollectionModule { }
