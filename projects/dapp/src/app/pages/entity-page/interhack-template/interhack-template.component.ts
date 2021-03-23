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
  SubmitCallBackAcceptWorkResultArg,
  SubmitCallBackApplyArg,
  SubmitCallBackRewardArg, SubmitCallBackSubmitSolutionResultArg
} from '@ui/dialog/dialog.tokens'
import {MatDialog} from '@angular/material/dialog'
import {TeamsAndSolutionsControlsInterface, VoteTeamEventInterface} from '@pages/entity-page/entity.interface'
import {AddRewardComponent} from '@ui/modals/add-reward/add-reward.component'
import {UserService} from '@services/user/user.service'
import {BehaviorSubject, combineLatest, Observable, Subject} from 'rxjs'
import {SubmitSolutionComponent} from '@ui/modals/submit-solution/submit-solution.component'
import {
  isAcceptWorkResultBtnInterhack,
  isStopSubmissionsBtn,
  prepareIsEnableSubmissionsBtnData,
  prepareIsFinishVoteBtnData,
  prepareIsRejectBtnData,
  prepareIsShowAddRewardBtnData,
  prepareIsStartWorkBtnData,
  prepareSquareFakeBlockVotingData,
  prepareTeamsAndSolutionData,
  prepareTeamsAndSolutionHeaderData,
  prepareTitleTextData,
  teamsAndSolutionsControls,
} from './functions'
import {InterhackContractService} from '@services/contract/Interhack-contract.service'
import {ActivatedRoute} from '@angular/router'
import {IScore} from '@services/interface'
import {AcceptWorkResultInterhackComponent} from '@ui/modals/accept-work-result-interhack/accept-work-result-interhack.component'
import {log} from '@libs/log'
import {Async, DestroyedSubject} from '@libs/decorators'
import {Web3TemplateInterface} from '@pages/entity-page/web3-template/web3-template.interface'
import {getEntityData} from '@pages/entity-page/functions'
import {HashService} from '@services/hash/hash.service'
import {CommunityContractService} from '@services/contract/community-contract.service'

@Component({
  selector: 'app-interhack-template',
  templateUrl: './interhack-template.component.html',
  styleUrls: ['./interhack-template.component.scss']
})
export class InterhackTemplateComponent implements OnDestroy {

  @Input() public readonly contract!: GrantsVariationType

  @DestroyedSubject() private readonly destroyed$!: Subject<null>

  eScore = IScore.EStepType

  @Async() @Input('grant') public readonly grant$!: Observable<ContractGrantModel>

  public entityData$: Observable<Web3TemplateInterface> = combineLatest([this.userService.stream$, this.grant$]).pipe(
    takeUntil(this.destroyed$),
    map(([user, grant]) => (getEntityData(user, grant))),
    tap(e => this.prepareVoteForTaskData(e)),
    map((grant) => {
      grant.isHashValid = this.hashService.isHashValid(grant.hash?.value || '', grant.link?.value || '')
      return grant
    }),
    publishReplay(1),
    refCount(),
    log('InterhackTemplateComponent::entityData$'),
  )

  voteForTaskData = {
    isShow: false,
    isVote: false,
    isVoteInProcess: false
  }

  public readonly isStopSubmissionsBtn$: Observable<boolean> =
    combineLatest([this.userService.data, this.grant$])
      .pipe(
        takeUntil(this.destroyed$),
        map(([user, grant]) => isStopSubmissionsBtn(user, grant))
      )

  public readonly squareFakeBlockVoting$: Observable<boolean> =
    combineLatest([this.grant$, this.userService.data])
      .pipe(
        takeUntil(this.destroyed$),
        map(([grant]) => grant),
        map((grant) => prepareSquareFakeBlockVotingData(grant))
      )

  public readonly isEnableSubmissionsBtn$: Observable<boolean> =
    combineLatest([this.userService.data, this.grant$])
      .pipe(
        takeUntil(this.destroyed$),
        map(([user, grant]) => prepareIsEnableSubmissionsBtnData(user, grant))
      )

  public titleText$: Observable<string> = combineLatest([this.grant$])
    .pipe(
      takeUntil(this.destroyed$),
      map(([grant]): string => prepareTitleTextData(grant)),
    )

  stepType$: BehaviorSubject<IScore.EStepType> = new BehaviorSubject<IScore.EStepType>(IScore.EStepType.team)

  teamsAndSolutionsControls$: Observable<TeamsAndSolutionsControlsInterface> = combineLatest(
    [this.userService.data, this.grant$])
    .pipe(
      takeUntil(this.destroyed$),
      map(([user, grant]) => teamsAndSolutionsControls(user, grant)),
      tap(e =>
        e.stepType === IScore.EStepType.team
          ? this.stepType$.next(IScore.EStepType.team)
          : this.stepType$.next(IScore.EStepType.solution)
      )
    )

  public readonly isShowAllTeamsBtn$: Observable<boolean> = this.grant$
    .pipe(
      takeUntil(this.destroyed$),
      map(e => typeof e?.status?.value === 'string' ? e.status.value : ''),
      map(e =>
        e === GrantStatusEnum.workStarted
        || e === GrantStatusEnum.workFinished
        || e === GrantStatusEnum.solutionChosen
      ),
    )

  winnerSolutionId$: BehaviorSubject<string> = new BehaviorSubject<string>('')
  winnerSolutionId = ''
  solutionIdList: string[] = []
  public readonly winnerSolution$ = this.grant$
    .pipe(
      takeUntil(this.destroyed$),
      filter(e => e !== null && e?.app !== undefined && e?.app.length > 0),
      map((e: ContractGrantModel): ContractGrantAppModel[] => e.app as ContractGrantAppModel[]),
      map((e: ContractGrantAppModel[]) => {
        let solution = e[0]
        const solutionIdList: string[] = []
        e.forEach(e => {

          const eScore = e.score?.solution?.value || 0
          const sScore = solution.score?.solution?.value || 0

          if (eScore > 0 && e.key) {
            solutionIdList.push(e.key)
          }

          if (eScore >= sScore) {
            solution = e
          }

        })
        return {key: solution.key as string, solutionIdList}
      })
    )
    .subscribe((e) => {
      this.winnerSolutionId = e.key
      this.winnerSolutionId$.next(e.key)
      this.solutionIdList = e.solutionIdList
    })


  public readonly isStartWorkBtn$: Observable<boolean> =
    combineLatest([this.userService.data, this.grant$])
      .pipe(
        takeUntil(this.destroyed$),
        map(([user, grant]) => prepareIsStartWorkBtnData(user, grant))
      )

  public readonly isFinishVoteBtn$: Observable<boolean> =
    combineLatest([this.userService.data, this.grant$])
      .pipe(
        takeUntil(this.destroyed$),
        map(([user, grant]): boolean => prepareIsFinishVoteBtnData(grant, user))
      )

  public readonly isAcceptWorkResultBtn$: Observable<boolean> =
    combineLatest([this.userService.data, this.grant$])
      .pipe(
        takeUntil(this.destroyed$),
        map(([user, grant]) => isAcceptWorkResultBtnInterhack(user, grant))
      )

  public readonly isRejectBtn$: Observable<boolean> =
    combineLatest([this.userService.data, this.grant$])
      .pipe(
        takeUntil(this.destroyed$),
        map(([user, grant]) => prepareIsRejectBtnData(grant, user))
      )

  isShowAddRewardBtn$ = combineLatest([this.userService.data, this.grant$])
    .pipe(
      takeUntil(this.destroyed$),
      map(([user, grant]) => prepareIsShowAddRewardBtnData(grant, user))
    )

  public readonly teamsAndSolutionHeader$: Observable<IScore.IHeader> = combineLatest(
    [
      this.grant$.pipe(log('1')),
      this.userService.stream$.pipe(log('2')),
      this.userService.isBalanceMoreCommission$.pipe(log('3')),
      this.titleText$.pipe(log('4')),
      this.teamsAndSolutionsControls$.pipe(log('5'))
    ])
    .pipe(
      log('HEADER'),
      filter(([grant]) => grant !== null && grant !== undefined),
      map(([grant, user, isBalance, titleText, controls]): IScore.IHeader =>
        prepareTeamsAndSolutionHeaderData(grant, user, isBalance, titleText, controls))
    )


  public readonly teamsAndSolution$: Observable<IScore.IUnit[]> = combineLatest(
    [
      this.grant$,
      this.userService.data,
      this.teamsAndSolutionsControls$,
      this.stepType$,
      this.squareFakeBlockVoting$,
      this.winnerSolutionId$
    ]
  )
    .pipe(
      takeUntil(this.destroyed$),
      filter(([grant]) => grant !== null && grant !== undefined),
      map(([grant, user, controls, step, fake, winnerSolutionId]) => {
          grant = grant
          user = user
          controls = controls
          fake = fake
          winnerSolutionId = winnerSolutionId
          return prepareTeamsAndSolutionData(grant, user, controls, step.toString(), fake, winnerSolutionId)
        }
      ),
      map((apps) =>
         apps.map(app => ({
            ...app,
            isHashValid: this.hashService.isHashValid(app.hash || '', app.teamLink || ''),
            isSolutionHashValid: this.hashService.isHashValid(app.solutionHash || '', app.solutionLink || ''),
          }))
      ),
    )

  public readonly isResetHashBtn$: Observable<boolean> = this.userService.data
    .pipe(
      map(data => data.roles.isWG)
    )

  constructor (
    public communityContractService: CommunityContractService,
    public hashService: HashService,
    private route: ActivatedRoute, // eslint-disable-line
    private readonly dialog: MatDialog, // eslint-disable-line
    public disruptiveContractService: DisruptiveContractService, // eslint-disable-line
    public interhackContractService: InterhackContractService,// eslint-disable-line
    private readonly snackBar: MatSnackBar,// eslint-disable-line
    public signerService: SignerService,// eslint-disable-line
    private readonly cdr: ChangeDetectorRef,// eslint-disable-line
    public userService: UserService// eslint-disable-line
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
              .subscribe(() => {
                dialog.close()
                this.cdr.markForCheck()
              })
          }
        }
      }
    })
  }

  voteTeam ($event: VoteTeamEventInterface, status: string, id: string): void {
    if (status === GrantStatusEnum.readyToApply) {
      this.disruptiveContractService.voteForApplicant(id, $event.teamIdentifier, $event.voteValue).subscribe()
    }
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
        component: AcceptWorkResultInterhackComponent,
        params: {
          title: translate('modal.texts.accept_work_result'),
          submitBtnText: translate('modal.btn.apply'),
          proposedWinner: this.winnerSolutionId,
          solutionIdList: this.solutionIdList,
          submitCallBack: (data: SubmitCallBackAcceptWorkResultArg) => {
            if (data.winnerTeamId) {
              this.interhackContractService.acceptWorkResult(id, data.winnerTeamId, data.reportLink).subscribe()
            }
            dialog.close()
            this.cdr.markForCheck()
          }
        }
      }
    })
  }

  finishApplicantsVote (id: string): void {
    this.interhackContractService.finishApplicantsVoting(id).subscribe()
  }

  addReward (id: string, status: string): void {
    const dialog = this.dialog.open(DialogComponent, {
      width: '500px',
      maxWidth: '100vw',
      data: {
        component: AddRewardComponent,
        params: {
          title: !status ? translate('entity.add_reward') : translate('entity.edit_task_details'),
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

  enableSubmissions (id: string): void {
    this.disruptiveContractService.enableSubmissions(id, '').subscribe()
  }

  submitSolution (id: string): void {
    const dialog = this.dialog.open(DialogComponent, {
      width: '500px',
      maxWidth: '100vw',
      data: {
        component: SubmitSolutionComponent,
        params: {
          title: translate('entity.submit_solution'),
          submitBtnText: translate('modal.btn.propose_grant'),
          grantId: id,
          submitCallBack: (data: SubmitCallBackSubmitSolutionResultArg) => {
            if (id) {
              this.disruptiveContractService.submitSolution(id, data.solutionLink, data.hash).subscribe()
            }
            dialog.close()
            this.cdr.markForCheck()
          }
        }
      }
    })
  }

  voteSolution ($event: VoteTeamEventInterface, id: string): void {
    this.disruptiveContractService.voteForSolution(id, $event.teamIdentifier, $event.voteValue).subscribe()
  }

  stopSubmissions (id: string): void {
    this.disruptiveContractService.stopSubmissions(id).subscribe()
  }

  private prepareVoteForTaskData (grant: ContractGrantModel = {}) {
    if (
      this.userService.data.getValue().roles.isDAO &&
      grant?.status?.value === GrantStatusEnum.proposed &&
      grant?.reward?.value
    ) {
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

  ngOnDestroy (): void {
  }

  resetHash (id: string, link: string): void {
    this.hashService.init(link)  // eslint-disable-line @typescript-eslint/no-floating-promises
      .then((hash: string = '') => {
        this.communityContractService.resetHash(id, hash).subscribe()
      })
  }

  hide (taskId: string): void {
    this.communityContractService.hide(taskId).subscribe()
  }
}
