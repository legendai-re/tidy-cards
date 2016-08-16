import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';
import { RouterModule }       from '@angular/router';
import { IvSharedModule }     from '../iv-shared/iv-shared.module';
import { IvCollectionModule } from '../iv-collection/iv-collection.module';

import { IvUserComponent }         from './iv-user.component';
import { IvConfirmEmailComponent } from './iv-confirm-email/iv-confirm-email.component';
import { IvUserPrivateComponent }  from './iv-user-private/iv-user-private.component';
import { IvUserPublicComponent }   from './iv-user-public/iv-user-public.component';

@NgModule({
  imports: [ RouterModule, CommonModule, FormsModule, IvSharedModule, IvCollectionModule ],
  declarations: [
    IvUserComponent,
    IvConfirmEmailComponent,
    IvUserPrivateComponent,
    IvUserPublicComponent,
  ],
  exports: [
    IvUserComponent,
    IvConfirmEmailComponent
  ],
  providers: []
})
export class IvUserModule { }
