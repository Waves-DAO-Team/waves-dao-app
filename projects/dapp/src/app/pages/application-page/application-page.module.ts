import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ApplicationPageRoutingModule } from './application-page-routing.module'
import { ApplicationPageComponent } from './application-page.component'

@NgModule({
  declarations: [ApplicationPageComponent],
  imports: [
    CommonModule,
    ApplicationPageRoutingModule
  ]
})
export class ApplicationPageModule { }
