import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';
import { RouterModule }       from '@angular/router';
import { IvSharedModule }     from '../iv-shared/iv-shared.module';

import { IvAuthComponent }   from './iv-auth.component';
import { IvSigninComponent } from './iv-signin.component';
import { IvSignupComponent } from './iv-signup.component';
import { IvLogoutComponent } from './iv-logout.component';

@NgModule({
    imports: [ RouterModule, CommonModule, FormsModule, IvSharedModule ],
    declarations: [
        IvAuthComponent,
        IvSigninComponent,
        IvSignupComponent,
        IvLogoutComponent
    ],
    exports: [
        IvAuthComponent,
        IvSigninComponent,
        IvSignupComponent,
        IvLogoutComponent
    ],
    providers: []
})
export class IvAuthModule { }
