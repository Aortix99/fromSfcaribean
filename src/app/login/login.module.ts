import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './components/login/login.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BlockUIModule } from 'ng-block-ui';
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    AmplifyUIAngularModule,
    CommonModule,
    LoginRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    BlockUIModule
  ]
})
export class LoginModule { }
