import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';
import { RouterModule }       from '@angular/router';
import { IvSharedModule }     from '../tc-shared/tc-shared.module';
import { IvCollectionModule } from '../tc-collection/tc-collection.module';
import { IvCollectionCardModule } from '../tc-collection/tc-collection-card/tc-collection-card.module';

import { IvUserComponent }         from './tc-user.component';
import { IvConfirmEmailComponent } from './tc-confirm-email/tc-confirm-email.component';
import { IvUserPrivateComponent }  from './tc-user-private/tc-user-private.component';
import { IvUserPublicComponent }   from './tc-user-public/tc-user-public.component';

@NgModule({
  imports: [ RouterModule, CommonModule, FormsModule, IvSharedModule, IvCollectionModule, IvCollectionCardModule ],
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
