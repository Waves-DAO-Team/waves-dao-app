import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MasterSettingPageRoutingModule } from './master-setting-page-routing.module'
import { MasterSettingPageComponent } from './master-setting-page.component'
import { ReactiveFormsModule } from '@angular/forms'
import { MasterSettingPageGuard } from '@pages/master-setting-page/master-setting-page.guard'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
  declarations: [MasterSettingPageComponent],
  imports: [
    CommonModule,
    MasterSettingPageRoutingModule,
    ReactiveFormsModule,
    TranslocoModule
  ],
  providers: [
    MasterSettingPageGuard
  ]

})
export class MasterSettingPageModule { }
