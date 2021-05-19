import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DaoMembershipProposeMemberComponent } from './propose-member.component'
import { ReactiveFormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
  declarations: [DaoMembershipProposeMemberComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslocoModule
  ],
  exports: [DaoMembershipProposeMemberComponent]
})
export class DaoMembershipProposeMemberModule { }
