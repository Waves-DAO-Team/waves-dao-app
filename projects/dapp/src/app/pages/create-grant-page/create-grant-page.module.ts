import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateGrantPageRoutingModule } from './create-grant-page-routing.module';
import { CreateGrantPageComponent } from './create-grant-page.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [CreateGrantPageComponent],
  imports: [
    CommonModule,
    CreateGrantPageRoutingModule,
    ReactiveFormsModule
  ]
})
export class CreateGrantPageModule { }
