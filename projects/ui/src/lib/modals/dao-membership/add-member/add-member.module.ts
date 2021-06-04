import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DaoMembershipAddMemberComponent } from './add-member.component'
import { ReactiveFormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
  declarations: [DaoMembershipAddMemberComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslocoModule
  ],
  exports: [DaoMembershipAddMemberComponent]
})
export class DaoMembershipAddMemberModule { }
