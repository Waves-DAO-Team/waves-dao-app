import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProposeGrantComponent } from './propose-grant.component';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslocoModule} from '@ngneat/transloco';



@NgModule({
  declarations: [ProposeGrantComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslocoModule
  ],
  exports: [ProposeGrantComponent]
})
export class ProposeGrantModule { }
