import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';
import { RouterModule }       from '@angular/router';
import { IvSharedModule }     from '../../tc-shared/tc-shared.module';

import { IvCollectionCreateComponent } from './tc-collection-create.component';

@NgModule({
  imports: [ RouterModule, CommonModule, FormsModule, IvSharedModule ],
  declarations: [
    IvCollectionCreateComponent
  ],
  exports: [
    IvCollectionCreateComponent
  ],
  providers: []
})
export class IvCollectionCreateModule { }
