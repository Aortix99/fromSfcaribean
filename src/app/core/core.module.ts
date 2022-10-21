import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';



@NgModule({
  declarations: [],
  imports: [
    MatDialogModule,
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue : {},
    },
    HttpClient
  ]
})
export class CoreModule { }
