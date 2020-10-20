import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AboutPageRoutingModule } from './about-page-routing.module'
import { AboutPageComponent } from './about-page.component'

@NgModule({
  declarations: [AboutPageComponent],
  imports: [
    CommonModule,
    AboutPageRoutingModule
  ]
})
export class AboutPageModule { }
