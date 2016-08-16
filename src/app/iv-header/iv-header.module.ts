import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';
import { RouterModule }       from '@angular/router';
import { IvSharedModule }     from '../iv-shared/iv-shared.module';
import { IvCollectionModule } from '../iv-collection/iv-collection.module';
import { IvSearchModule }     from '../iv-search/iv-search.module';

import { IvHeaderComponent }  from './iv-header.component';

@NgModule({
  imports: [ RouterModule, CommonModule, FormsModule, IvSharedModule, IvCollectionModule, IvSearchModule ],
  declarations: [
    IvHeaderComponent
  ],
  exports: [
    IvHeaderComponent
  ],
  providers: []
})
export class IvHeaderModule { }
