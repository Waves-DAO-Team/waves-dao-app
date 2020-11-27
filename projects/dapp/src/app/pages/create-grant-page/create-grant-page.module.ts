import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IConfig, NgxMaskModule } from 'ngx-mask'

import { CreateGrantPageRoutingModule } from './create-grant-page-routing.module'
import { CreateGrantPageComponent } from './create-grant-page.component'
import { ReactiveFormsModule } from '@angular/forms'
import { CreateGrantPageGuard } from '@pages/create-grant-page/create-grant-page.guard'
import { TranslocoModule } from '@ngneat/transloco'
import {AppComponent} from "@dapp/src/app/app.component";
import {RewardDirective} from "@libs/directives/reward.directive";
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
  ],
  exports: []
})
export class CreateGrantPageModule { }
