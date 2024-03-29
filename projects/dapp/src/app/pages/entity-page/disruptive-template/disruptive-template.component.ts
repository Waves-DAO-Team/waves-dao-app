import {ChangeDetectorRef, Component, Input, OnDestroy} from '@angular/core'
import {ContractGrantAppModel, ContractGrantModel} from '@services/contract/contract.model'
import {GrantStatusEnum, GrantsVariationType} from '@services/static/static.model'
import {DisruptiveContractService} from '@services/contract/disruptive-contract.service'
import {MatSnackBar} from '@angular/material/snack-bar'
import {SignerService} from '@services/signer/signer.service'
import {filter, map, publishReplay, refCount, take, takeUntil, tap} from 'rxjs/operators'
import {translate} from '@ngneat/transloco'
import {DialogComponent} from '@ui/dialog/dialog.component'
import {ApplyComponent} from '@ui/modals/apply/apply.component'
import {
  FinishApplicantsVotingArg,
  SubmitCallBackAcceptWorkResultArg,
  SubmitCallBackApplyArg,
  SubmitCallBackRewardArg
} from '@ui/dialog/dialog.tokens'
import {MatDialog} from '@angular/material/dialog'
import {VoteTeamEventInterface} from '@pages/entity-page/entity.interface'
import {AddRewardComponent} from '@ui/modals/add-reward/add-reward.component'
import {UserService} from '@services/user/user.service'
import {AcceptWorkResultComponent} from '@ui/modals/accept-work-result/accept-work-result.component'
import {combineLatest, Observable, Subject} from 'rxjs'
import {
  getWinnerTeamId,
  isAcceptWorkResultBtn,
  isFinishApplicantsVoteBtn,
  isFinishVoteBtn,
  isShowAddRewardBtn,
  isStartWorkBtn, prepareIsRejectBtnData,
  prepareTeamsData,
  prepareTeamsHeaderData
} from '@pages/entity-page/disruptive-template/functions'
import {ActivatedRoute} from '@angular/router'
import {IScore} from '@services/interface'
import {FinishApplicantsVotingComponent} from '@ui/modals/finish-applicants-voting/finish-applicants-voting.component'
import {Async, DestroyedSubject} from '@libs/decorators'
import {Web3TemplateInterface} from '@pages/entity-page/web3-template/web3-template.interface'
import {log} from '@libs/log'
import {getEntityData} from '@pages/entity-page/functions'
import {HashService} from '@services/hash/hash.service'
import {CommunityContractService} from '@services/contract/community-contract.service'

@Component({
  selector: 'app-disruptive-template',
  templateUrl: './disruptive-template.component.html',
  styleUrls: ['./disruptive-template.component.scss']
})
export class DisruptiveTemplateComponent implements OnDestroy {
  @Input() public readonly contract!: GrantsVariationType

  @Async() @Input('grant') public readonly grant$!: Observable<ContractGrantModel>

  @DestroyedSubject() private readonly destroyed$!: Subject<null>

  private teamIdList: string[] = []

  public entityData$: Observable<Web3TemplateInterface> = combineLatest([this.userService.stream$, this.grant$]).pipe(
    takeUntil(this.destroyed$),
    map(([user, grant]) => (getEntityData(user, grant))),
    log('DisruptiveTemplateComponent::entityData$'),
    tap(grant => {
      this.teamIdList = []
      if (grant && grant?.app) {
        grant?.app.forEach(el => {
          if (el?.score?.value && +el?.score?.value > 0) {
            this.teamIdList.push(el.id.value)
          }
        })
      }
    }),
    map((grant) => {
      grant.isHashValid = this.hashService.isHashValid(grant.hash?.value || '', grant.link?.value || '')
      return grant
    }),
    tap( e => this.prepareVoteForTaskData(e)),
    publishReplay(1),
    refCount()
  )

  public readonly isShowTeamsBtn$: Observable<boolean> = this.grant$
    .pipe(
      takeUntil(this.destroyed$),
      map((grants: ContractGrantModel): ContractGrantAppModel[] => grants?.app || []),
      map((app: ContractGrantAppModel[]) => !!app.find((a) => !!a.process))
    )

  public readonly teamsHeader$: Observable<IScore.IHeader> = combineLatest(
    [this.grant$, this.userService.data, this.userService.isBalanceMoreCommission$])
    .pipe(
      filter(([grant]) => grant !== null && grant !== undefined),
      map(([grant, user, isBalance]): IScore.IHeader => prepareTeamsHeaderData(grant, user, isBalance))
    )

  public readonly teams$: Observable<IScore.IUnit[]> = combineLatest(
    [this.grant$, this.userService.data, this.isShowTeamsBtn$]
  )
    .pipe(
      takeUntil(this.destroyed$),
      filter(([grant]) => grant !== null && grant !== undefined),
      map(([grant, user, isProcess]) => prepareTeamsData(grant, user, isProcess)),
    )

  public readonly isShowStepperAndTeam$: Observable<boolean> = this.grant$
    .pipe(
      takeUntil(this.destroyed$),
      map(e => typeof e?.status?.value === 'string' ? e?.status?.value : ''),
      map(e => e !== GrantStatusEnum.rejected),
    )

  public readonly isResetHashBtn$: Observable<boolean> = this.userService.data
    .pipe(
      map(data => data.roles.isWG)
    )

  public readonly isShowAddRewardBtn$: Observable<boolean> = combineLatest([this.userService.data, this.grant$])
    .pipe(
      takeUntil(this.destroyed$),
      map(([user, grant]) => isShowAddRewardBtn(user, grant))
    )

  public readonly isStartWorkBtn$: Observable<boolean> = combineLatest([this.userService.data, this.grant$])
    .pipe(
      takeUntil(this.destroyed$),
      map(([user, grant]) => isStartWorkBtn(user, grant))
    )

  public readonly isFinishApplicantsVoteBtn$: Observable<boolean> = combineLatest([this.userService.data, this.grant$])
    .pipe(
      takeUntil(this.destroyed$),
      map(([user, grant]) => isFinishApplicantsVoteBtn(user, grant))
    )

  public readonly isAcceptWorkResultBtn$: Observable<boolean> = combineLatest([this.userService.data, this.grant$])
    .pipe(
      takeUntil(this.destroyed$),
      map(([user, grant]) => isAcceptWorkResultBtn(user, grant))
    )

  public readonly isFinishVoteBtn$: Observable<boolean> = combineLatest([this.userService.data, this.grant$])
    .pipe(
      takeUntil(this.destroyed$),
      map(([user, grant]) => isFinishVoteBtn(user, grant))
    )

  public voteForTaskData = {
    isShow: false,
    isVote: false,
    isVoteInProcess: false
  }

  public readonly isRejectBtn$: Observable<boolean> = combineLatest([this.userService.data, this.grant$])
    .pipe(
      takeUntil(this.destroyed$),
      map(([user, grant]) => prepareIsRejectBtnData(grant, user))
    )

  constructor (
    public hashService: HashService,
    public communityContractService: CommunityContractService,
    private route: ActivatedRoute, // eslint-disable-line
    private readonly dialog: MatDialog, // eslint-disable-line
    public disruptiveContractService: DisruptiveContractService, // eslint-disable-line
    private readonly snackBar: MatSnackBar, // eslint-disable-line
    public signerService: SignerService, // eslint-disable-line
    private readonly cdr: ChangeDetectorRef,// eslint-disable-line
    public userService: UserService // eslint-disable-line
  ) {
  }

  vote (value: 'like' | 'dislike', id: string): void {
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

  openApplyModal (grant: ContractGrantModel): void {
    const dialog = this.dialog.open(DialogComponent, {
      width: '500px',
      maxWidth: '100vw',
      data: {
        component: ApplyComponent,
        params: {
          grant,
          submitCallBack: (data: SubmitCallBackApplyArg) => {
            this.disruptiveContractService.applyForTask(data.id, data.team, data.link, data.hash)
              .pipe(take(1))
              .subscribe()
            dialog.close()
            this.cdr.markForCheck()
          }
        }
      }
    })
  }

  voteTeam ($event: VoteTeamEventInterface, id: string): void {
    const teamId = $event.teamIdentifier
    const vote = $event.voteValue
    this.disruptiveContractService.voteForApplicant(id, teamId, vote).subscribe()
  }

  finishVote (id: string): void {
    this.disruptiveContractService.finishTaskProposalVoting(id).subscribe()
  }

  startWork (id: string): void {
    this.disruptiveContractService.startWork(id).subscribe()
  }

  reject (id: string): void {
    this.disruptiveContractService.rejectTask(id).subscribe()
  }

  acceptWorkResult (id: string): void {
    const dialog = this.dialog.open(DialogComponent, {
      width: '500px',
      maxWidth: '100vw',
      data: {
        component: AcceptWorkResultComponent,
        params: {
          title: translate('modal.texts.accept_work_result'),
          submitBtnText: translate('modal.btn.apply'),
          submitCallBack: (data: SubmitCallBackAcceptWorkResultArg) => {
            this.disruptiveContractService.acceptWorkResult(id, data.reportLink)
              .subscribe()
            dialog.close()
            this.cdr.markForCheck()
          }
        }
      }
    })
  }

  finishApplicantsVote (grant: ContractGrantModel, id: string): void {
    const dialog = this.dialog.open(DialogComponent, {
      width: '500px',
      maxWidth: '100vw',
      data: {
        component: FinishApplicantsVotingComponent,
        params: {
          title: translate('entity.finish_applicants_voting'),
          submitBtnText: translate('modal.btn.propose_grant'),
          grantId: id,
          teamIdList: this.teamIdList,
          proposedWinner: getWinnerTeamId(grant),
          submitCallBack: (data: FinishApplicantsVotingArg) => {
            const winnerTeamId = data.winnerTeamId
            if (id && winnerTeamId) {
              this.disruptiveContractService.finishApplicantsVoting(id, winnerTeamId).subscribe()
            }
            dialog.close()
            this.cdr.markForCheck()
          }
        }
      }
    })
  }

  addReward (grant: ContractGrantModel, id: string): void {
    const dialog = this.dialog.open(DialogComponent, {
      width: '500px',
      maxWidth: '100vw',
      data: {
        component: AddRewardComponent,
        params: {
          title: !grant.status?.value ? translate('entity.add_reward') : translate('entity.edit_task_details'),
          submitBtnText: translate('modal.btn.propose_grant'),
          grantId: id,
          submitCallBack: (data: SubmitCallBackRewardArg) => {
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
    if (this.userService.data.getValue().roles.isDAO && grant.status?.value === GrantStatusEnum.proposed) {
      this.voteForTaskData.isShow = true
    } else {
      this.voteForTaskData.isShow = false
    }
    if (grant && grant.id && grant?.voted && !!grant?.voted[this.userService.data.getValue()?.userAddress]) {
      this.voteForTaskData.isVote = true
    } else {
      this.voteForTaskData.isVote = false
    }
  }

  resetHash (id: string, link: string): void {
    this.hashService.init(link)  // eslint-disable-line @typescript-eslint/no-floating-promises
      .then((hash: string = '') => {
        this.communityContractService.resetHash(id, hash).subscribe()
      })
  }

  ngOnDestroy (): void {
  }

  hide (taskId: string): void {
    this.communityContractService.hide(taskId).subscribe()
  }
}
