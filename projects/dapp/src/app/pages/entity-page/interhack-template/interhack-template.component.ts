import {ChangeDetectorRef, Component, Input} from '@angular/core'
import {ContractGrantModel} from '@services/contract/contract.model'
import {GrantStatusEnum, GrantsVariationType} from '@services/static/static.model'
import {DisruptiveContractService} from '@services/contract/disruptive-contract.service'
import {MatSnackBar} from '@angular/material/snack-bar'
import {SignerService} from '@services/signer/signer.service'
import {filter, map, skipWhile, take, tap} from 'rxjs/operators'
import {translate} from '@ngneat/transloco'
import {DialogComponent} from '@ui/dialog/dialog.component'
import {ApplyComponent} from '@ui/modals/apply/apply.component'
import {
  SubmitCallBackAcceptWorkResultArg,
  SubmitCallBackApplyArg,
  SubmitCallBackRewardArg, SubmitCallBackSubmitSolutionResultArg
} from '@ui/dialog/dialog.tokens'
import {MatDialog} from '@angular/material/dialog'
import {
  TeamsAndSolutionsControlsInterface,
  TemplateComponentAbstract,
  VoteTeamEventInterface
} from '@pages/entity-page/entity.interface'
import {AddRewardComponent} from '@ui/modals/add-reward/add-reward.component'
import {UserService} from '@services/user/user.service'
import {AcceptWorkResultComponent} from '@ui/modals/accept-work-result/accept-work-result.component'
import {combineLatest, Observable, Subject} from 'rxjs'
import {SubmitSolutionComponent} from "@ui/modals/submit-solution/submit-solution.component";
import {teamsAndSolutionsControls} from './functions'

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

  teamsAndSolutionsControls$: Observable<TeamsAndSolutionsControlsInterface> = combineLatest(
    [this.userService.data, this.grant$])
    .pipe(map(([user, grant]) => teamsAndSolutionsControls(user, grant)))

  winnerIdentifier: string | null = null
  winnerIdentifier$ = this.grant$.pipe(
    filter(d => d !== null),
    map(d => d.app),
    map(d => {
      let res = {
        id: '',
        vote: 0
      }
      if (d) {
        d.forEach((e) => {
          if (e.votes && e.votes.solution && e.votes.solution.value && e.key) {
            const solution = +e.votes.solution.value
            if (solution > res.vote) {
              res.vote = solution
              res.id = e.key
            }
          }
        })
      }
      return res.vote > 0 ? res.id : null
    }),
    tap((d) => this.winnerIdentifier = d)
  ).subscribe()

  isStopSubmissionsBtn$ = combineLatest([this.userService.data, this.grant$])
    .pipe(
      map(([user, grant]) => {
        const isStatusMatch = grant?.status?.value === this.grantStatusEnum.workStarted
        let isVoteForSolution = false
        if(grant.app)
          grant.app.forEach((app)=>{
            if(app.solution) {
              isVoteForSolution = true
            }
          })
        const isWG = user.roles.isWG
        return isVoteForSolution && isWG && isStatusMatch
      })
    )
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
          const isStatusMatch = grant?.status?.value === this.grantStatusEnum.proposed
          const isWG = user.roles.isWG
          return isAmount && isWG && isStatusMatch
        } else {
          return false
        }
      })
    )

  isEnableSubmissionsBtn$ = combineLatest([this.userService.data, this.grant$])
    .pipe(
      map(([user, grant]) => {
        if (grant && grant.app) {
          let isVoteForTeam = false
          grant.app.forEach((app) => {
            if(app && app.voted && app.votes) {
              isVoteForTeam = true
            }
          })
          const isTeamApply = grant.app.length > 0 ? true : false
          const isRole = user.roles.isDAO
          const isStatusMatch = grant?.status?.value === this.grantStatusEnum.readyToApply
          return isVoteForTeam && isTeamApply && isRole && isStatusMatch
        } else {
          return false
        }
      })
    )

  isAcceptWorkResultBtn$ = combineLatest([this.userService.data, this.grant$])
    .pipe(
      map(([user, grant]) => {
        if (grant && grant.app) {
          const isWG = user.roles.isWG
          let isVote = false
          grant.app.forEach((app)=>{
            if(app.voted.solution && app.voted.solution.value) {
              isVote = true
            }
          })
          const isStatusMatch = grant?.status?.value === this.grantStatusEnum.workFinished
          return isVote && isWG && isStatusMatch
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
            grant?.status?.value !== this.grantStatusEnum.workFinished
            && grant?.status?.value !== this.grantStatusEnum.rejected
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
          // !grant?.reward?.value
          const isWG = user.roles.isWG
          const isNoReward = !grant?.reward?.value
          const isStatusMatch = !grant?.status?.value ||
            grant?.status?.value === this.grantStatusEnum.proposed ||
            grant?.status?.value === this.grantStatusEnum.readyToApply ||
            grant?.status?.value === this.grantStatusEnum.teamChosen
          return isNoReward && isWG && isStatusMatch
        } else {
          return false
        }
      })
    )

  userServiceData$ = this.userService.data.subscribe(() => {
    this.prepareVoteForTaskData()
  })

  GSgrant: ContractGrantModel = {}

  @Input() set grant(data: ContractGrantModel) {
    // if (data !== this.GSgrant) {
    this.GSgrant = data
    this.prepareVoteForTaskData(data)
    // }
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

  private prepareVoteForTaskData(grant: ContractGrantModel = this.GSgrant) {
    if (
      this.userService.data.getValue().roles.isDAO &&
      grant?.status?.value === this.grantStatusEnum.proposed &&
      grant?.reward?.value
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
            if (this.grant?.id && this.winnerIdentifier)
              this.disruptiveContractService.acceptWorkResult(
                this.grant?.id as string,
                this.winnerIdentifier,
                data.reportLink
              )
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

  enableSubmissions() {
    if (this.grant?.id) {
      this.disruptiveContractService.enableSubmissions(this.grant?.id, '').subscribe(() => {
      })
    }
  }

  submitSolution() {
    const dialog = this.dialog.open(DialogComponent, {
      data: {
        component: SubmitSolutionComponent,
        params: {
          title: translate('entity.submit_solution'),
          submitBtnText: translate('modal.btn.propose_grant'),
          grantId: this.grant?.id,
          submitCallBack: (data: SubmitCallBackSubmitSolutionResultArg) => {
            const id = this.grant?.id
            if (id) {
              this.disruptiveContractService.submitSolution(id, data.solutionLink).subscribe()
            }
            dialog.close()
            this.cdr.markForCheck()
          }
        }
      }
    })
  }

  voteForSolution($event: VoteTeamEventInterface) {
    if (this.grant?.id) {
      this.disruptiveContractService.voteForSolution(
        this.grant?.id, $event.teamIdentifier, $event.voteValue).subscribe()
    }
  }

  stopSubmissions() {
    if (this.grant?.id) {
      this.disruptiveContractService.stopSubmissions(this.grant?.id).subscribe()
    }
  }
}
