import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { EditGrantPageRoutingModule } from './edit-grant-page-routing.module'
import { EditGrantPageComponent } from './edit-grant-page.component'
import { ReactiveFormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'
import { EditGrantPageGuard } from '@pages/edit-grant-page/edit-grant-page.guard'
import { IConfig, NgxMaskModule } from 'ngx-mask'
import { RewardModule } from '@libs/directives/reward.module'
const maskConfig: Partial<IConfig> = {
  validation: false
}
@NgModule({
  declarations: [EditGrantPageComponent],
  imports: [
    RewardModule,
    CommonModule,
    EditGrantPageRoutingModule,
    ReactiveFormsModule,
    TranslocoModule,
    NgxMaskModule.forRoot(maskConfig)
  ],
  providers: [
    EditGrantPageGuard
  ],
  exports: []
})
export class EditGrantPageModule { }
