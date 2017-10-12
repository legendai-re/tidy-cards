import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';
import { RouterModule }       from '@angular/router';
import { IvSharedModule }     from '../tc-shared/tc-shared.module';

import { IvAboutComponent }   from './tc-about/tc-about.component';
import { IvContactComponent } from './tc-contact/tc-contact.component';
import { IvTeamComponent }    from './tc-team/tc-team.component';
import { IvTermsComponent }   from './tc-terms/tc-terms.component';

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
