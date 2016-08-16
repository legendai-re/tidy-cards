import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';
import { RouterModule }       from '@angular/router';
import { IvSharedModule }     from '../iv-shared/iv-shared.module';

import { IvItemUrlComponent }     from './iv-item-url/iv-item-url.component';
import { IvItemImageComponent }   from './iv-item-image/iv-item-image.component';
import { IvItemTweetComponent }   from './iv-item-tweet/iv-item-tweet.component';
import { IvItemYoutubeComponent } from './iv-item-youtube/iv-item-youtube.component';
import { IvItemComponent }        from './iv-item.component';
import { IvItemCreateComponent }  from './iv-item-create/iv-item-create.component';

@NgModule({
  imports: [ RouterModule, CommonModule, FormsModule, IvSharedModule ],
  declarations: [
    IvItemUrlComponent,
    IvItemImageComponent,
    IvItemTweetComponent,
    IvItemYoutubeComponent,
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
