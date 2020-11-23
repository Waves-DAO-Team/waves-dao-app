import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IConfig, NgxMaskModule } from 'ngx-mask'

import { CreateGrantPageRoutingModule } from './create-grant-page-routing.module'
import { CreateGrantPageComponent } from './create-grant-page.component'
import { ReactiveFormsModule } from '@angular/forms'
import { CreateGrantPageGuard } from '@pages/create-grant-page/create-grant-page.guard'
import { TranslocoModule } from '@ngneat/transloco'
const maskConfig: Partial<IConfig> = {
  validation: false
}
@NgModule({
  declarations: [CreateGrantPageComponent],
  imports: [
    CommonModule,
    CreateGrantPageRoutingModule,
    ReactiveFormsModule,
    TranslocoModule,
    NgxMaskModule,
    NgxMaskModule.forRoot(maskConfig)
  ],
  providers: [
    CreateGrantPageGuard
  ]
})
export class CreateGrantPageModule { }
