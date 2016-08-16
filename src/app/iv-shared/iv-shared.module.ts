import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';

import { IvSortableDirective } from './iv-sortable.directive';
import { FILE_UPLOAD_DIRECTIVES } from 'ng2-file-upload';

@NgModule({
  imports: [ CommonModule, FormsModule ],
  declarations: [
    IvSortableDirective,
    FILE_UPLOAD_DIRECTIVES
  ],
  exports: [
    IvSortableDirective,
    FILE_UPLOAD_DIRECTIVES
  ],
  providers: []
})

export class IvSharedModule { }
