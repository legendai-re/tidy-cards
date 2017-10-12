import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule }        from '@angular/forms';
import { RouterModule }       from '@angular/router';
import { IvSharedModule }     from '../tc-shared/tc-shared.module';

import { IvAuthComponent }   from './tc-auth.component';
import { IvSigninComponent } from './tc-signin.component';
import { IvSignupComponent } from './tc-signup.component';
import { IvLogoutComponent } from './tc-logout.component';

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
