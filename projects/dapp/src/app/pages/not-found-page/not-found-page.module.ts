import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { NotFoundPageRoutingModule } from './not-found-page-routing.module'
import { NotFoundPageComponent } from './not-found-page.component'
import { TranslocoModule } from '@ngneat/transloco'
import {CreateGrantPageGuard} from "@pages/create-grant-page/create-grant-page.guard";

@NgModule({
  declarations: [NotFoundPageComponent],
  imports: [
    CommonModule,
    NotFoundPageRoutingModule,
    TranslocoModule
  ]
})
export class NotFoundPageModule { }
