import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { StylesheetPageRoutingModule } from './stylesheet-page-routing.module'
import { StylesheetPageComponent } from './stylesheet-page.component'

@NgModule({
  declarations: [StylesheetPageComponent],
  imports: [
    CommonModule,
    StylesheetPageRoutingModule
  ]
})
export class StylesheetPageModule { }
