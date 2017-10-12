import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';
import { RouterModule }       from '@angular/router';
import { IvSharedModule }     from '../tc-shared/tc-shared.module';
import { IvCollectionModule } from '../tc-collection/tc-collection.module';
import { IvSearchModule }     from '../tc-search/tc-search.module';

import { IvHeaderComponent }  from './tc-header.component';

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
