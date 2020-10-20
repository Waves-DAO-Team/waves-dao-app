import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SettingPageRoutingModule } from './setting-page-routing.module'
import { SettingPageComponent } from './setting-page.component'

@NgModule({
  declarations: [SettingPageComponent],
  imports: [
    CommonModule,
    SettingPageRoutingModule
  ]
})
export class SettingPageModule { }
