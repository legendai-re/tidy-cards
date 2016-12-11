import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';
import { RouterModule }       from '@angular/router';
import { IvSharedModule }     from '../iv-shared/iv-shared.module';

import { IvAboutComponent }   from './iv-about/iv-about.component';
import { IvContactComponent } from './iv-contact/iv-contact.component';
import { IvTeamComponent }    from './iv-team/iv-team.component';
import { IvTermsComponent }   from './iv-terms/iv-terms.component';

@NgModule({
  imports: [ RouterModule, CommonModule, FormsModule, IvSharedModule],
  declarations: [
    IvAboutComponent,
    IvContactComponent,
    IvTeamComponent,
    IvTermsComponent
  ],
  exports: [
    IvAboutComponent,
    IvContactComponent,
    IvTeamComponent,
    IvTermsComponent
  ],
  providers: []
})
export class IvPageModule { }
