import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';
import { RouterModule }       from '@angular/router';
import { IvSharedModule }     from '../iv-shared/iv-shared.module';
import { IvCollectionModule } from '../iv-collection/iv-collection.module';
import { IvCollectionCardModule } from '../iv-collection/iv-collection-card/iv-collection-card.module';

import { IvSearchComponent }       from './iv-search.component';
import { IvSearchHeaderComponent } from './iv-search-header.component';

@NgModule({
  imports: [ RouterModule, CommonModule, FormsModule, IvSharedModule, IvCollectionModule, IvCollectionCardModule ],
  declarations: [
    IvSearchComponent,
    IvSearchHeaderComponent
  ],
  exports: [
    IvSearchComponent,
    IvSearchHeaderComponent
  ],
  providers: []
})
export class IvSearchModule { }
