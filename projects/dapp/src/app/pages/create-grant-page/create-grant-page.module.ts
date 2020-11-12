import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateGrantPageRoutingModule } from './create-grant-page-routing.module';
import { CreateGrantPageComponent } from './create-grant-page.component';
import {ReactiveFormsModule} from "@angular/forms";
import {CreateGrantPageGuard} from "@pages/create-grant-page/create-grant-page.guard";
import {TranslocoModule} from "@ngneat/transloco";


@NgModule({
  declarations: [CreateGrantPageComponent],
  imports: [
    CommonModule,
    CreateGrantPageRoutingModule,
    ReactiveFormsModule,
    TranslocoModule
  ],
  providers: [
    CreateGrantPageGuard
  ]
})
export class CreateGrantPageModule { }
