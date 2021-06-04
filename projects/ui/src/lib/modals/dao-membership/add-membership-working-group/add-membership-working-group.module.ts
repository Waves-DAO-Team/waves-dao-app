import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DaoMembershipAddMembershipWorkingGroupComponent } from './add-membership-working-group.component'
import { ReactiveFormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
  declarations: [DaoMembershipAddMembershipWorkingGroupComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslocoModule
  ],
  exports: [DaoMembershipAddMembershipWorkingGroupComponent]
})
export class DaoMembershipAddMembershipWorkingGroupModule { }
