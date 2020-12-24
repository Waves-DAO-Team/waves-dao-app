import {ChangeDetectorRef, Component, Input} from '@angular/core'
import {ContractGrantModel} from '@services/contract/contract.model'
import {GrantStatusEnum, GrantsVariationType} from '@services/static/static.model'
import {DisruptiveContractService} from '@services/contract/disruptive-contract.service'
import {MatSnackBar} from '@angular/material/snack-bar'
import {SignerService} from '@services/signer/signer.service'
import {map, take} from 'rxjs/operators'
import {translate} from '@ngneat/transloco'
import {DialogComponent} from '@ui/dialog/dialog.component'
import {ApplyComponent} from '@ui/modals/apply/apply.component'
import {
  SubmitCallBackAcceptWorkResultArg,
  SubmitCallBackApplyArg,
  SubmitCallBackRewardArg
} from '@ui/dialog/dialog.tokens'
import {MatDialog} from '@angular/material/dialog'
import {TemplateComponentAbstract, VoteTeamEventInterface} from '@pages/entity-page/entity.interface'
import {AddRewardComponent} from '@ui/modals/add-reward/add-reward.component'
import {UserService} from '@services/user/user.service'
import {AcceptWorkResultComponent} from "@ui/modals/accept-work-result/accept-work-result.component";
import {combineLatest, Subject} from "rxjs";

@Component({
  selector: 'app-interhack-template',
  templateUrl: './interhack-template.component.html',
  styleUrls: ['./interhack-template.component.scss']
})
export class InterhackTemplateComponent implements TemplateComponentAbstract {
  grantStatusEnum = GrantStatusEnum

  voteForTaskData = {
    isShow: false,
    isVote: false
  }

  grant$ = new Subject<ContractGrantModel>();

  isVoteForTaskTemplate$ = combineLatest([this.userService.data, this.grant$])
    .pipe(
      map(([user, grant]) => {
        if (grant) {
          let isTL = grant.leader?.value === user.userAddress
          let isStatusMatch = grant.status?.value === this.grantStatusEnum.approved
          return isTL && isStatusMatch
        } else {
          return false
        }
      })
    )

  isStartWorkBtn$ = combineLatest([this.userService.data, this.grant$])
    .pipe(
      map(([user, grant]) => {
        if (grant) {
          let isTL = grant.leader?.value === user.userAddress
          let isStatusMatch = grant.status?.value === this.grantStatusEnum.approved
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
          let isAmount = grant?.voting?.amount
          let isStatusMatch = grant?.status?.value === this.grantStatusEnum.proposed
          let isWG = user.roles.isWG
          return isAmount && isWG && isStatusMatch
        } else {
          return false
        }
      })
    )

  isEnableSubmissionsBtn$ = combineLatest([this.userService.data, this.grant$])
    .pipe(
      map(([user, grant]) => {
        if (grant) {
          let isRole = user.roles.isDAO
          let isStatusMatch = grant?.status?.value === this.grantStatusEnum.readyToApply
          return isRole && isStatusMatch
        } else {
          return false
        }
      })
    )

  isSubmitSolutionBtn$ = combineLatest([this.userService.data, this.grant$])
    .pipe(
      map(([user, grant]) => {
        if (grant) {
          let isRole = user.roles.isDAO
          let isStatusMatch = grant?.status?.value === this.grantStatusEnum.workStarted
          return isRole && isStatusMatch
        } else {
          return false
        }
      })
    )

  isAcceptWorkResultBtn$ = combineLatest([this.userService.data, this.grant$])
    .pipe(
      map(([user, grant]) => {
        if (grant) {
          let isWG = user.roles.isWG
          let isStatusMatch = grant?.status?.value === this.grantStatusEnum.workStarted
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
          let isWG = user.roles.isWG
          let isStatusMatch = grant?.status?.value !== this.grantStatusEnum.workFinished
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
          let isWG = user.roles.isWG
          let isStatusMatch = !grant?.status?.value
          return isWG && isStatusMatch
        } else {
          return false
        }
      })
    )

  GSgrant: ContractGrantModel = {}

  @Input() set grant(data: ContractGrantModel) {
    if (data !== this.GSgrant) {
      this.GSgrant = data
      this.prepareVoteForTaskData(data)
    }
    this.grant$.next(data)
  }

  get grant() {
    return this.GSgrant
  }

  @Input() public readonly contract!: GrantsVariationType

  constructor(
    private dialog: MatDialog,
    public disruptiveContractService: DisruptiveContractService,
    private snackBar: MatSnackBar,
    public signerService: SignerService,
    private cdr: ChangeDetectorRef,
    public userService: UserService
  ) {
  }

  private prepareVoteForTaskData(grant: ContractGrantModel) {
    if (
      this.userService.data.getValue().roles.isDAO
      && grant?.status?.value === this.grantStatusEnum.proposed
      && grant?.reward?.value
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

  vote(value: 'like' | 'dislike') {
    const id = this.grant.id || ''
    this.disruptiveContractService.voteForTaskProposal(id, value).subscribe()
  }

  signup() {
    this.signerService.login()
      .pipe(take(1))
      .subscribe(() => {
      }, (error) => {
        this.snackBar.open(error, translate('messages.ok'))
      })
  }

  openApplyModal() {
    const dialog = this.dialog.open(DialogComponent, {
      data: {
        component: ApplyComponent,
        params: {
          grant: this.grant,
          submitCallBack: (data: SubmitCallBackApplyArg) => {
            this.disruptiveContractService.applyForTask(data.id, data.team, data.link)
              .pipe(take(1))
              .subscribe(() => {
                dialog.close()
                this.cdr.markForCheck()
              })
          }
        }
      }
    })
  }

  voteTeam($event: VoteTeamEventInterface) {
    if (this.grant?.status?.value === GrantStatusEnum.readyToApply) {
      this.disruptiveContractService.voteForApplicant(this.grant?.id as string, $event.teamIdentifier, $event.voteValue).subscribe()
    }
  }

  finishVote() {
    this.disruptiveContractService.finishTaskProposalVoting(this.grant?.id as string).subscribe()
  }

  startWork(): void {
    this.disruptiveContractService.startWork(this.grant?.id as string).subscribe()
  }

  reject(): void {
    this.disruptiveContractService.rejectTask(this.grant?.id as string).subscribe()
  }

  acceptWorkResult(): void {
    const dialog = this.dialog.open(DialogComponent, {
      data: {
        component: AcceptWorkResultComponent,
        params: {
          title: translate('modal.texts.accept_work_result'),
          submitBtnText: translate('modal.btn.apply'),
          submitCallBack: (data: SubmitCallBackAcceptWorkResultArg) => {
            this.disruptiveContractService.acceptWorkResult(this.grant?.id as string, data.reportLink)
              .subscribe(() => {
                dialog.close()
                this.cdr.markForCheck()
              })
          }
        }
      }
    })
  }

  finishApplicantsVote(): void {
    this.disruptiveContractService.finishApplicantsVoting(this.grant?.id as string).subscribe()
  }

  addReward(): void {
    const dialog = this.dialog.open(DialogComponent, {
      data: {
        component: AddRewardComponent,
        params: {
          title: !this.grant?.status?.value ? translate('entity.add_reward') : translate('entity.edit_task_details'),
          submitBtnText: translate('modal.btn.propose_grant'),
          grantId: this.grant?.id,
          submitCallBack: (data: SubmitCallBackRewardArg) => {
            if (this.grant?.id) {
              this.disruptiveContractService.addReward(this.grant?.id, data.reward).subscribe(() => {
              })
            }
            dialog.close()
            this.cdr.markForCheck()
          }
        }
      }
    })
  }

  enableSubmissions() {
    if (this.grant?.id)
      this.disruptiveContractService.enableSubmissions(this.grant?.id, '').subscribe(() => {
      })
  }

  submitSolution() {
    if (this.grant?.id)
      this.disruptiveContractService.submitSolution(this.grant?.id).subscribe(() => {
      })
  }

  voteForSolution() {
    if (this.grant?.id)
      this.disruptiveContractService.voteForSolution(this.grant?.id, '', 1).subscribe(() => {
      })
  }

  stopSubmissions() {
    if (this.grant?.id)
      this.disruptiveContractService.stopSubmissions(this.grant?.id).subscribe(() => {})
  }
}
