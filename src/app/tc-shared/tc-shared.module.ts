import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';

import { IvSortableDirective } from './tc-sortable.directive';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload/ng2-file-upload';

@NgModule({
  imports: [ CommonModule, FormsModule ],
  declarations: [
    IvSortableDirective,
    FileSelectDirective,
    FileDropDirective
  ],
  exports: [
    IvSortableDirective,
    FileSelectDirective,
    FileDropDirective
  ],
  providers: []
})

export class IvSharedModule { }
