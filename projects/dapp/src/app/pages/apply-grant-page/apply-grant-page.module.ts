import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ApplyGrantPageRoutingModule } from '@pages/apply-grant-page/apply-grant-page-routing.module'
import { ApplyGrantPageComponent } from '@pages/apply-grant-page/apply-grant-page.component'
import { ReactiveFormsModule } from '@angular/forms'
import { ModalModule } from '@ui/modal/modal.module'
import { ApplyGrantPageGuard } from '@pages/apply-grant-page/apply-grant-page.guard'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
  declarations: [ApplyGrantPageComponent],
  imports: [
    CommonModule,
    ApplyGrantPageRoutingModule,
    ReactiveFormsModule,
    ModalModule,
    TranslocoModule
  ],
  providers: [
    ApplyGrantPageGuard
  ]
})
export class ApplyGrantPageModule {
}
