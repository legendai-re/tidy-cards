import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';
import { RouterModule }       from '@angular/router';
import { IvSharedModule }     from '../../tc-shared/tc-shared.module';

import { IvCollectionCardComponent }     from './tc-collection-card.component';

@NgModule({
  imports: [ RouterModule, CommonModule, FormsModule, IvSharedModule ],
  declarations: [
    IvCollectionCardComponent
  ],
  exports: [
    IvCollectionCardComponent
  ],
  providers: []
})
export class IvCollectionCardModule { }
