import {ChangeDetectorRef, Component, Input, OnDestroy} from '@angular/core'
import { ContractGrantModel } from '@services/contract/contract.model'
import { GrantsVariationType } from '@services/static/static.model'
import { MatSnackBar } from '@angular/material/snack-bar'
import { SignerService } from '@services/signer/signer.service'
import {map, publishReplay, refCount, take, takeUntil} from 'rxjs/operators'
import { translate } from '@ngneat/transloco'
import { DialogComponent } from '@ui/dialog/dialog.component'
import {
  SubmitCallBackAcceptWorkResultArg,
  SubmitCallBackRewardArg
} from '@ui/dialog/dialog.tokens'
import { MatDialog } from '@angular/material/dialog'
import { AddTaskDetailsComponent } from '@ui/modals/add-task-details/add-task-details.component'
import { CommunityContractService } from '@services/contract/community-contract.service'
import { UserService } from '@services/user/user.service'
import { AcceptWorkResultComponent } from '@ui/modals/accept-work-result/accept-work-result.component'
import {combineLatest, Observable, Subject} from 'rxjs'
import {Async, DestroyedSubject} from '@libs/decorators'
import { Web3TemplateInterface } from './web3-template.interface'
import { log } from '@libs/log'
import {getEntityData} from '@pages/entity-page/functions'
import {HashService} from '@services/hash/hash.service'

@Component({
  selector: 'app-web3-template',
  templateUrl: './web3-template.component.html',
  styleUrls: ['./web3-template.component.scss']
})
export class Web3TemplateComponent implements OnDestroy {
  @Input() public readonly contract!: GrantsVariationType

  @DestroyedSubject() private readonly destroyed$!: Subject<null>

  @Async() @Input('grant') public readonly grant$!: Observable<ContractGrantModel>

  public isVoteInProcess = false

  public entityData$: Observable<Web3TemplateInterface> = combineLatest([this.userService.stream$, this.grant$]).pipe(
    takeUntil(this.destroyed$),
    map(([user, grant]) => (getEntityData(user, grant))),
    map((grant) =>
      // grant.isHashValid = this.hashService.isHashValid(grant.hash?.value || '', grant.link?.value || '')
       grant
    ),
    log('Web3TemplateComponent::entityData$'),
    publishReplay(1),
    refCount()
  )

  isStartWorkBtn$: Observable<boolean> = this.entityData$
    .pipe(
      takeUntil(this.destroyed$),
      map((web3Grant: Web3TemplateInterface) => web3Grant.isLeader && web3Grant.isApproved)
    )

  isFinishVoteBtn$: Observable<boolean> = this.entityData$
    .pipe(
      takeUntil(this.destroyed$),
      map((web3Grant: Web3TemplateInterface) => web3Grant.isAmount && web3Grant.isVotingStarted && web3Grant.isWG)
    )

  isInitTaskVotingtBtn$: Observable<boolean> = this.entityData$
    .pipe(
      takeUntil(this.destroyed$),
      map((web3Grant: Web3TemplateInterface) => web3Grant.isReward && web3Grant.isNewGrant && web3Grant.isWG)
    )

  isAcceptWorkResultBtn$: Observable<boolean> = this.entityData$
    .pipe(
      takeUntil(this.destroyed$),
      map((web3Grant: Web3TemplateInterface) => web3Grant.isWorkStarted && web3Grant.isWG)
    )

  isRejectBtn$: Observable<boolean> = this.entityData$
    .pipe(
      takeUntil(this.destroyed$),
      map((web3Grant: Web3TemplateInterface) => web3Grant.isCanceled && web3Grant.isWG)
    )

  isShowAddRewardBtn$: Observable<boolean> = this.entityData$
    .pipe(
      takeUntil(this.destroyed$),
      map((web3Grant: Web3TemplateInterface) => web3Grant.isLeader && web3Grant.isNewGrant)
    )

  public readonly isResetHashBtn$: Observable<boolean> = this.userService.data
    .pipe(
      map(data => data.roles.isWG)
    )

  constructor (
    public hashService: HashService,
    private readonly dialog: MatDialog,
    public communityContractService: CommunityContractService,
    private readonly snackBar: MatSnackBar,
    public signerService: SignerService,
    private readonly cdr: ChangeDetectorRef,
    public userService: UserService
  ) {}

  vote (value: 'like' | 'dislike', id: string): void {
    this.isVoteInProcess = true
    this.communityContractService.voteForTaskProposal(id, value).subscribe({
      complete: () => {
        this.isVoteInProcess = false
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

  finishVote (id: string): void {
    this.communityContractService.finishTaskProposalVoting(id).subscribe()
  }

  startWork (id: string): void {
    this.communityContractService.startWork(id).subscribe()
  }

  reject (id: string): void {
    this.communityContractService.rejectTask(id).subscribe()
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
            this.communityContractService.acceptWorkResult(id, data.reportLink).subscribe()
            dialog.close()
            this.cdr.markForCheck()
          }
        }
      }
    })
  }

  addReward (status: string | null = null, id: string = ''): void {
    const dialog = this.dialog.open(DialogComponent, {
      width: '500px',
      maxWidth: '100vw',
      data: {
        component: AddTaskDetailsComponent,
        params: {
          title: !status ? translate('entity.add_reward') : translate('entity.edit_task_details'),
          submitBtnText: translate('modal.btn.apply'),
          submitCallBack: (data: SubmitCallBackRewardArg) => {
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

  initTaskVoting (id: string): void {
    if (id) {
      this.communityContractService.initTaskVoting(id).subscribe(() => {
        this.cdr.markForCheck()
      })
    }
  }

  ngOnDestroy (): void {}

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
