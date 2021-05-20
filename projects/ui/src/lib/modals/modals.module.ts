import {NgModule} from '@angular/core'
import { AddMemberModule } from './add-member/add-member.module'
import {AcceptWorkResultModule} from '@ui/modals/accept-work-result/accept-work-result.module'
import {AddRewardModule} from '@ui/modals/add-reward/add-reward.module'
import {AddTaskDetailsModule} from '@ui/modals/add-task-details/add-task-details.module'
import {FinishApplicantsVotingModule} from '@ui/modals/finish-applicants-voting/finish-applicants-voting.module'
import {ApplyModule} from '@ui/modals/apply/apply.module'
import {ProposeGrantModule} from '@ui/modals/propose-grant/propose-grant.module'
import {SubmitSolutionModule} from '@ui/modals/submit-solution/submit-solution.module'
import {AcceptWorkResultInterhackModule} from '@ui/modals/accept-work-result-interhack/accept-work-result-interhack.module'
import {AddProposalModule} from '@ui/modals/add-proposal/add-proposal.module'
import {DaoMembershipAddMemberModule} from '@ui/modals/dao-membership/add-member/add-member.module'
import {DaoMembershipProposeMemberModule} from "@ui/modals/dao-membership/propose-member/propose-member.module";
import {DaoMembershipRejectMemberModule} from "@ui/modals/dao-membership/reject-member/reject-member.module";
import {DaoMembershipAddWorkingGroupModule} from "@ui/modals/dao-membership/add-working-group/add-working-group.module";
import {DaoMembershipAddMembershipWorkingGroupModule} from "@ui/modals/dao-membership/add-membership-working-group/add-membership-working-group.module";

export * from './accept-work-result/accept-work-result.module'
export * from './add-reward/add-reward.module'
export * from './add-proposal/add-proposal.module'
export * from './add-task-details/add-task-details.module'
export * from './apply/apply.module'
export * from './propose-grant/propose-grant.module'
export * from './submit-solution/submit-solution.module'
export * from './dao-membership/add-member/add-member.module'
export * from './dao-membership/propose-member/propose-member.module'
export * from './dao-membership/reject-member/reject-member.module'
export * from './dao-membership/add-working-group/add-working-group.module'
export * from './dao-membership/add-membership-working-group/add-membership-working-group.module'

@NgModule({
  imports: [
    AddMemberModule,
    AcceptWorkResultModule,
    AddRewardModule,
    AddTaskDetailsModule,
    FinishApplicantsVotingModule,
    ApplyModule,
    ProposeGrantModule,
    AcceptWorkResultInterhackModule,
    SubmitSolutionModule,
    AddProposalModule,
    DaoMembershipAddMemberModule,
    DaoMembershipProposeMemberModule,
    DaoMembershipAddWorkingGroupModule,
    DaoMembershipAddMembershipWorkingGroupModule,
    DaoMembershipRejectMemberModule
  ]
})
export class ModalsModule { }
