import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';
import { RouterModule }       from '@angular/router';
import { IvSharedModule }     from '../../iv-shared/iv-shared.module';

import { IvCollectionCardComponent }     from './iv-collection-card.component';

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
