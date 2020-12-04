import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AboutPageRoutingModule } from './about-page-routing.module'
import { AboutPageComponent } from './about-page.component'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
  declarations: [AboutPageComponent],
  imports: [
    CommonModule,
    AboutPageRoutingModule,
    TranslocoModule
  ]
})
export class AboutPageModule { }
