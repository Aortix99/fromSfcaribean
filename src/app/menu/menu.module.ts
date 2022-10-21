import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './components/menu/menu.component';
import { MaterialModule } from '../material/material.module';
import { BlockUIModule } from 'ng-block-ui';
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';

@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    AmplifyUIAngularModule,
    CommonModule,
    MenuRoutingModule,
    MaterialModule,
    BlockUIModule.forRoot(),
  ], 
  exports: [
    MenuComponent
  ]
})
export class MenuModule { }
