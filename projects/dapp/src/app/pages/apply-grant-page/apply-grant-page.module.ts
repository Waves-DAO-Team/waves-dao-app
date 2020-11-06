import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ApplyGrantPageRoutingModule } from '@pages/apply-grant-page/apply-grant-page-routing.module'
import { ApplyGrantPageComponent } from '@pages/apply-grant-page/apply-grant-page.component'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [ApplyGrantPageComponent],
  imports: [
    CommonModule,
    ApplyGrantPageRoutingModule,
    ReactiveFormsModule
  ]
})
export class ApplyGrantPageModule {
}
