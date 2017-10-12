import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';
import { RouterModule }       from '@angular/router';
import { IvSharedModule }     from '../tc-shared/tc-shared.module';
import { IvCollectionModule } from '../tc-collection/tc-collection.module';
import { IvCollectionCardModule } from '../tc-collection/tc-collection-card/tc-collection-card.module';

import { IvSearchComponent }       from './tc-search.component';
import { IvSearchHeaderComponent } from './tc-search-header.component';

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
