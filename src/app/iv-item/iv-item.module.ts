import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';
import { RouterModule }       from '@angular/router';
import { IvSharedModule }     from '../iv-shared/iv-shared.module';
import { IvCollectionCardModule } from '../iv-collection/iv-collection-card/iv-collection-card.module';
import { IvCollectionCreateModule } from '../iv-collection/iv-collection-create/iv-collection-create.module';

import { IvItemUrlComponent }     from './iv-item-url/iv-item-url.component';
import { IvItemImageComponent }   from './iv-item-image/iv-item-image.component';
import { IvItemTweetComponent }   from './iv-item-tweet/iv-item-tweet.component';
import { IvItemYoutubeComponent } from './iv-item-youtube/iv-item-youtube.component';
import { IvItemCollectionComponent } from './iv-item-collection/iv-item-collection.component';
import { IvItemComponent }        from './iv-item.component';
import { IvItemCreateComponent }  from './iv-item-create/iv-item-create.component';

@NgModule({
  imports: [ RouterModule, CommonModule, FormsModule, IvSharedModule, IvCollectionCardModule, IvCollectionCreateModule ],
  declarations: [
    IvItemUrlComponent,
    IvItemImageComponent,
    IvItemTweetComponent,
    IvItemYoutubeComponent,
    IvItemCollectionComponent,
    IvItemComponent,
    IvItemCreateComponent
  ],
  exports: [
    IvItemComponent,
    IvItemCreateComponent
  ],
  providers: []
})
export class IvItemModule { }
