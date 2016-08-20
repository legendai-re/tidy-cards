import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';
import { RouterModule }       from '@angular/router';
import { IvSharedModule }     from '../iv-shared/iv-shared.module';
import { IvItemModule }       from '../iv-item/iv-item.module';
import { IvCollectionCardModule } from './iv-collection-card/iv-collection-card.module';

import { IvCollectionCreateComponent }   from './iv-collection-create/iv-collection-create.component';
import { IvCollectionMeComponent }       from './iv-collection-me/iv-collection-me.component';
import { IvCollectionDetailComponent }   from './iv-collection-detail/iv-collection-detail.component';
import { IvCollectionFeaturedComponent } from './iv-collection-featured/iv-collection-featured.component';
import { IvCollectionLastComponent }     from './iv-collection-last/iv-collection-last.component';
import { IvCollectionPopularComponent }  from './iv-collection-popular/iv-collection-popular.component';

@NgModule({
  imports: [ RouterModule, CommonModule, FormsModule, IvSharedModule, IvItemModule, IvCollectionCardModule ],
  declarations: [
    IvCollectionCreateComponent,
    IvCollectionMeComponent,
    IvCollectionDetailComponent,
    IvCollectionFeaturedComponent,
    IvCollectionLastComponent,
    IvCollectionPopularComponent
  ],
  exports: [
    IvCollectionCreateComponent,
    IvCollectionMeComponent,
    IvCollectionDetailComponent,
    IvCollectionFeaturedComponent,
    IvCollectionLastComponent,
    IvCollectionPopularComponent
  ],
  providers: []
})
export class IvCollectionModule { }
