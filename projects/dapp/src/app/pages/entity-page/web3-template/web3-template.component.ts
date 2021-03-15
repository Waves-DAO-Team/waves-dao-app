import {ChangeDetectorRef, Component, Input} from '@angular/core'
import { ContractGrantModel } from '@services/contract/contract.model'
import { GrantStatusEnum, GrantsVariationType } from '@services/static/static.model'
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

@Component({
  selector: 'app-web3-template',
  templateUrl: './web3-template.component.html',
  styleUrls: ['./web3-template.component.scss']
})
export class Web3TemplateComponent  {
  @Input() public readonly contract!: GrantsVariationType

  @DestroyedSubject() private readonly destroyed$!: Subject<null>

  @Async() @Input('grant') public readonly grant$!: Observable<ContractGrantModel>

  public isVoteInProcess = false

  public entityData$: Observable<Web3TemplateInterface> = combineLatest([this.userService.stream$, this.grant$]).pipe(
    takeUntil(this.destroyed$),
    map(([user, grant]) => ({
        ...grant,
        isApproved: grant?.status?.value === GrantStatusEnum.approved,
        isLeader: grant?.leader?.value === user.userAddress,
        isAmount: !!grant?.voting?.amount,
        isVotingStarted: grant?.status?.value === GrantStatusEnum.votingStarted,
        isWG: user.roles.isWG,
        isReward: !!grant?.reward?.value,
        isNewGrant: !grant?.status?.value,
        isCanceled: grant?.status?.value !== GrantStatusEnum.workFinished && grant?.status?.value !== GrantStatusEnum.rejected,
        isWorkStarted: grant?.status?.value === GrantStatusEnum.workStarted,
        isShowVoting: user.roles.isDAO && grant?.status?.value === GrantStatusEnum.votingStarted,
        isVoteForGrant: user.roles.isDAO && !!grant?.voted && !!grant?.voted[user.userAddress]
      })),
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

  constructor (
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

  addReward (status: string | null = null, id: string): void {
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

}
