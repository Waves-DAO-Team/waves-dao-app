import { ChangeDetectorRef, Component, Input } from '@angular/core'
import { ContractGrantModel } from '@services/contract/contract.model'
import { GrantStatusEnum, GrantsVariationType } from '@services/static/static.model'
import { MatSnackBar } from '@angular/material/snack-bar'
import { SignerService } from '@services/signer/signer.service'
import { map, take } from 'rxjs/operators'
import { translate } from '@ngneat/transloco'
import { DialogComponent } from '@ui/dialog/dialog.component'
import { ApplyComponent } from '@ui/modals/apply/apply.component'
import {
  SubmitCallBackAcceptWorkResultArg,
  SubmitCallBackApplyArg,
  SubmitCallBackRewardArg
} from '@ui/dialog/dialog.tokens'
import { MatDialog } from '@angular/material/dialog'
import { TemplateComponentAbstract, VoteTeamEventInterface } from '@pages/entity-page/entity.interface'
import { AddTaskDetailsComponent } from '@ui/modals/add-task-details/add-task-details.component'
import { CommunityContractService } from '@services/contract/community-contract.service'
import { UserService } from '@services/user/user.service'
import { AcceptWorkResultComponent } from '@ui/modals/accept-work-result/accept-work-result.component'
import { combineLatest, Subject } from 'rxjs'

@Component({
  selector: 'app-web3-template',
  templateUrl: './web3-template.component.html',
  styleUrls: ['./web3-template.component.scss']
})
export class Web3TemplateComponent implements TemplateComponentAbstract {

  private GSgrant: ContractGrantModel = {}

  @Input() set grant (data: ContractGrantModel) {
    if (data !== this.GSgrant) {
      this.GSgrant = data
      this.prepareVoteForTaskData(data)
    }
    this.grant$.next(data)
  }

  @Input() public readonly contract!: GrantsVariationType

  grantStatusEnum = GrantStatusEnum

  voteForTaskData = {
    isShow: false,
    isVote: false,
    isVoteInProcess: false
  }

  grant$ = new Subject<ContractGrantModel>()

  isStartWorkBtn$ = combineLatest([this.userService.data, this.grant$])
    .pipe(
      map(([user, grant]) => {
        if (grant) {
          const isTL = grant.leader?.value === user.userAddress
          const isStatusMatch = grant.status?.value === this.grantStatusEnum.approved
          return isTL && isStatusMatch
        } else {
          return false
        }
      })
    )

  isFinishVoteBtn$ = combineLatest([this.userService.data, this.grant$])
    .pipe(
      map(([user, grant]) => {
        if (grant) {
          const isAmount = grant?.voting?.amount
          const isStatusMatch = grant?.status?.value === this.grantStatusEnum.votingStarted
          const isWG = user.roles.isWG
          return isAmount && isWG && isStatusMatch
        } else {
          return false
        }
      })
    )

  isInitTaskVotingtBtn$ = combineLatest([this.userService.data, this.grant$])
    .pipe(
      map(([user, grant]) => {
        if (grant) {
          const isWG = user.roles.isWG
          const isStatusMatch = !grant?.status?.value
          const isReward = grant?.reward?.value
          return isReward && isWG && isStatusMatch
        } else {
          return false
        }
      })
    )

  isAcceptWorkResultBtn$ = combineLatest([this.userService.data, this.grant$])
    .pipe(
      map(([user, grant]) => {
        if (grant) {
          const isWG = user.roles.isWG
          const isStatusMatch = grant?.status?.value === this.grantStatusEnum.workStarted
          return isWG && isStatusMatch
        } else {
          return false
        }
      })
    )

  isRejectBtn$ = combineLatest([this.userService.data, this.grant$])
    .pipe(
      map(([user, grant]) => {
        if (grant) {
          const isWG = user.roles.isWG
          const isStatusMatch =
            grant?.status?.value !== this.grantStatusEnum.workFinished &&
            grant?.status?.value !== this.grantStatusEnum.rejected
          return isWG && isStatusMatch
        } else {
          return false
        }
      })
    )

  isShowAddRewardBtn$ = combineLatest([this.userService.data, this.grant$])
    .pipe(
      map(([user, grant]) => {
        if (grant) {
          const isRole = grant.leader?.value === user.userAddress
          const isStatusMatch = !grant?.status?.value
          return isRole && isStatusMatch
        } else {
          return false
        }
      })
    )

  get grant () {
    return this.GSgrant
  }

  constructor (
    private readonly dialog: MatDialog,
    public communityContractService: CommunityContractService,
    private readonly snackBar: MatSnackBar,
    public signerService: SignerService,
    private readonly cdr: ChangeDetectorRef,
    public userService: UserService
  ) {
  }

  private prepareVoteForTaskData (grant: ContractGrantModel) {
    if (
      this.userService.data.getValue().roles.isDAO &&
      grant?.status?.value === this.grantStatusEnum.votingStarted
    ) {
      this.voteForTaskData.isShow = true
    } else {
      this.voteForTaskData.isShow = false
    }
    if (grant && grant.id && this.userService.data.getValue().voted.includes(grant.id)) {
      this.voteForTaskData.isVote = true
    } else {
      this.voteForTaskData.isVote = false
    }
  }

  vote (value: 'like' | 'dislike'): void {
    const id = this.grant.id || ''
    this.voteForTaskData.isVoteInProcess = true
    this.communityContractService.voteForTaskProposal(id, value).subscribe({
      complete: () => {
        this.voteForTaskData.isVoteInProcess = false
        this.cdr.markForCheck()
      }
    })
  }

  signup (): void {
    this.signerService.login()
      .pipe(take(1))
      .subscribe(() => {
      }, (error) => {
        this.snackBar.open(error, translate('messages.ok'))
      })
  }

  openApplyModal (): void {
    this.dialog.open(DialogComponent, {
      data: {
        component: ApplyComponent,
        params: {
          grant: this.grant,
          submitCallBack: (data: SubmitCallBackApplyArg) => {
            this.communityContractService.applyForTask(data.id, data.team, data.link).pipe(take(1)).subscribe()
          }
        }
      }
    })
  }

  voteTeam ($event: VoteTeamEventInterface): void {
    if (this.grant?.status?.value === GrantStatusEnum.readyToApply) {
      this.communityContractService.voteForApplicant(this.grant?.id as string, $event.teamIdentifier, $event.voteValue).subscribe()
    }
  }

  finishVote (): void {
    this.communityContractService.finishTaskProposalVoting(this.grant?.id as string).subscribe()
  }

  startWork (): void {
    this.communityContractService.startWork(this.grant?.id as string).subscribe()
  }

  reject (): void {
    this.communityContractService.rejectTask(this.grant?.id as string).subscribe()
  }

  acceptWorkResult (): void {
    const dialog = this.dialog.open(DialogComponent, {
      data: {
        component: AcceptWorkResultComponent,
        params: {
          title: translate('modal.texts.accept_work_result'),
          submitBtnText: translate('modal.btn.apply'),
          submitCallBack: (data: SubmitCallBackAcceptWorkResultArg) => {
            this.communityContractService.acceptWorkResult(this.grant?.id as string, data.reportLink)
              .subscribe(() => {
                dialog.close()
                this.cdr.markForCheck()
              })
          }
        }
      }
    })
  }

  finishApplicantsVote (): void {
    this.communityContractService.finishApplicantsVoting(this.grant?.id as string).subscribe()
  }

  addReward () {
    const dialog = this.dialog.open(DialogComponent, {
      data: {
        component: AddTaskDetailsComponent,
        params: {
          title: !this.grant?.status?.value ? translate('entity.add_reward') : translate('entity.edit_task_details'),
          submitBtnText: translate('modal.btn.apply'),
          submitCallBack: (data: SubmitCallBackRewardArg) => {
            const id = this.grant?.id
            const reward = parseInt(data.reward, 10).toString()
            if (id) {
              this.communityContractService.addReward(id, reward).subscribe()
            }
            dialog.close()
            this.cdr.markForCheck()
          }
        }
      }
    })
  }

  initTaskVoting () {
    if (this.grant.id) {
      this.communityContractService.initTaskVoting(this.grant.id).subscribe((e) => {
        this.cdr.markForCheck()
      })
    }
  }
}
