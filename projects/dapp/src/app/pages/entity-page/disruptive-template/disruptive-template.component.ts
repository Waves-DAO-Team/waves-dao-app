import {ChangeDetectorRef, Component, Input} from '@angular/core'
import {ContractGrantAppModel, ContractGrantModel} from '@services/contract/contract.model'
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
import {
  TeamsControlsInterface,
  TemplateComponentAbstract,
  VoteTeamEventInterface
} from '@pages/entity-page/entity.interface'
import {AddRewardComponent} from '@ui/modals/add-reward/add-reward.component'
import {UserService} from '@services/user/user.service'
import {AcceptWorkResultComponent} from '@ui/modals/accept-work-result/accept-work-result.component'
import {combineLatest, Observable, Subject} from 'rxjs'
import {
  getWinnerTeamId, isAcceptWorkResultBtn,
  isFinishApplicantsVoteBtn, isFinishVoteBtn, isShowAddRewardBtn, isStartWorkBtn,
  teamsControls
} from '@pages/entity-page/disruptive-template/functions'
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-disruptive-template',
  templateUrl: './disruptive-template.component.html',
  styleUrls: ['./disruptive-template.component.scss']
})
export class DisruptiveTemplateComponent implements TemplateComponentAbstract {
  @Input() public readonly contract!: GrantsVariationType

  grantStatusEnum = GrantStatusEnum

  grant$ = new Subject<ContractGrantModel>()


  isShowStepperAndTeam$: Observable<boolean> = this.grant$
    .pipe(
      map(e => typeof e?.status?.value === 'string' ? e?.status?.value : ''),
      map(e => e !== GrantStatusEnum.rejected),
    )

  isShowAddRewardBtn$: Observable<boolean> = combineLatest([this.userService.data, this.grant$])
    .pipe(map(([user, grant]) => isShowAddRewardBtn(user, grant)))

  teamsControls$: Observable<TeamsControlsInterface> = combineLatest([this.userService.data, this.grant$])
    .pipe(map(([user, grant]) => teamsControls(user, grant)))

  isStartWorkBtn$: Observable<boolean> = combineLatest([this.userService.data, this.grant$])
    .pipe(map(([user, grant]) => isStartWorkBtn(user, grant)))

  isFinishApplicantsVoteBtn$: Observable<boolean> = combineLatest([this.userService.data, this.grant$])
    .pipe(map(([user, grant]) => isFinishApplicantsVoteBtn(user, grant)))

  isAcceptWorkResultBtn$: Observable<boolean> = combineLatest([this.userService.data, this.grant$])
    .pipe(map(([user, grant]) => isAcceptWorkResultBtn(user, grant)))

  isFinishVoteBtn$: Observable<boolean> = combineLatest([this.userService.data, this.grant$])
    .pipe(map(([user, grant]) => isFinishVoteBtn(user, grant)))

  voteForTaskData = {
    isShow: false,
    isVote: false,
    isVoteInProcess: false
  }

  isRejectBtn$ = combineLatest([this.userService.data, this.grant$])
    .pipe(
      map(([user, grant]) => {
        if (grant) {
          const isWG = user.roles.isWG
          const isStatusMatch = grant?.status?.value !== this.grantStatusEnum.rejected
          return isWG && isStatusMatch
        } else {
          return false
        }
      })
    )

  public readonly isShowTeamsBtn$: Observable<boolean> = this.grant$
    .pipe(
      map((grants: ContractGrantModel): ContractGrantAppModel[]  => grants?.app || []),
      map((app: ContractGrantAppModel[]) => !!app.find((a) => !!a.process))
  )

  @Input() set grant (data: ContractGrantModel) {
    if (data !== this.inputGrant) {
      this.inputGrant = data
      this.prepareVoteForTaskData(data)
    }
    this.grant$.next(data)
  }

  get grant (): ContractGrantModel {
    return this.inputGrant
  }

  private inputGrant: ContractGrantModel = {}

  constructor (
    private route: ActivatedRoute, // eslint-disable-line
    private readonly dialog: MatDialog, // eslint-disable-line
    public disruptiveContractService: DisruptiveContractService, // eslint-disable-line
    private readonly snackBar: MatSnackBar, // eslint-disable-line
    public signerService: SignerService, // eslint-disable-line
    private readonly cdr: ChangeDetectorRef,// eslint-disable-line
    public userService: UserService // eslint-disable-line
  ) {
  }

  vote (value: 'like' | 'dislike'): void {
    const id = this.grant.id || ''
    this.voteForTaskData.isVoteInProcess = true
    this.disruptiveContractService.voteForTaskProposal(id, value).subscribe({
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

  voteTeam ($event: VoteTeamEventInterface): void {
    const id = this.grant?.id as string
    const teamId = $event.teamIdentifier
    const vote = $event.voteValue
    this.disruptiveContractService.voteForApplicant(id, teamId, vote).subscribe()
  }

  finishVote (): void {
    this.disruptiveContractService.finishTaskProposalVoting(this.grant?.id as string).subscribe()
  }

  startWork (): void {
    this.disruptiveContractService.startWork(this.grant?.id as string).subscribe()
  }

  reject (): void {
    this.disruptiveContractService.rejectTask(this.grant?.id as string).subscribe()
  }

  acceptWorkResult (): void {
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

  finishApplicantsVote (): void {
    const id = this.grant.id as string
    if (id) {
      this.disruptiveContractService.finishApplicantsVoting(id, getWinnerTeamId(this.grant)).subscribe()
    }
  }

  addReward (): void {
    const dialog = this.dialog.open(DialogComponent, {
      data: {
        component: AddRewardComponent,
        params: {
          title: !this.grant?.status?.value ? translate('entity.add_reward') : translate('entity.edit_task_details'),
          submitBtnText: translate('modal.btn.propose_grant'),
          grantId: this.grant?.id,
          submitCallBack: (data: SubmitCallBackRewardArg) => {
            const id = this.grant?.id
            const reward = parseInt(data.reward, 10).toString()
            if (id) {
              this.disruptiveContractService.addReward(id, reward).subscribe()
            }
            dialog.close()
            this.cdr.markForCheck()
          }
        }
      }
    })
  }

  private prepareVoteForTaskData (grant: ContractGrantModel) {
    if (this.userService.data.getValue().roles.isDAO && grant.status?.value === this.grantStatusEnum.proposed) {
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
}
