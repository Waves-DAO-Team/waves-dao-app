import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DaoMembershipRejectMemberComponent } from './reject-member.component'
import { ReactiveFormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
  declarations: [DaoMembershipRejectMemberComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslocoModule
  ],
  exports: [DaoMembershipRejectMemberComponent]
})
export class DaoMembershipRejectMemberModule { }
