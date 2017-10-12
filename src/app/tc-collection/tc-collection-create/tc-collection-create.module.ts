import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';
import { RouterModule }       from '@angular/router';
import { TcSharedModule }     from '../../tc-shared/tc-shared.module';

import { TcCollectionCreateComponent } from './tc-collection-create.component';

@NgModule({
  imports: [ RouterModule, CommonModule, FormsModule, TcSharedModule ],
  declarations: [
    TcCollectionCreateComponent
  ],
  exports: [
    TcCollectionCreateComponent
  ],
  providers: []
})
export class TcCollectionCreateModule { }
