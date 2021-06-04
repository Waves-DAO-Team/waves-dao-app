import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DaoMembershipAddWorkingGroupComponent } from './add-working-group.component'
import { ReactiveFormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
  declarations: [DaoMembershipAddWorkingGroupComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslocoModule
  ],
  exports: [DaoMembershipAddWorkingGroupComponent]
})
export class DaoMembershipAddWorkingGroupModule { }
