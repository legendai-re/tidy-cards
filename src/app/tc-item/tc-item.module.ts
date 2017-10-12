import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';
import { RouterModule }       from '@angular/router';
import { IvSharedModule }     from '../tc-shared/tc-shared.module';
import { IvCollectionCardModule } from '../tc-collection/tc-collection-card/tc-collection-card.module';
import { IvCollectionCreateModule } from '../tc-collection/tc-collection-create/tc-collection-create.module';

import { IvItemUrlComponent }     from './tc-item-url/tc-item-url.component';
import { IvItemImageComponent }   from './tc-item-image/tc-item-image.component';
import { IvItemTweetComponent }   from './tc-item-tweet/tc-item-tweet.component';
import { IvItemYoutubeComponent } from './tc-item-youtube/tc-item-youtube.component';
import { IvItemCollectionComponent } from './tc-item-collection/tc-item-collection.component';
import { IvItemComponent }        from './tc-item.component';
import { IvItemCreateComponent }  from './tc-item-create/tc-item-create.component';

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
