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
import {
  TemplateComponentAbstract,
  VoteTeamEventInterface
} from '@pages/entity-page/entity.interface'
import {AddRewardComponent} from '@ui/modals/add-reward/add-reward.component'
import {UserService} from '@services/user/user.service'
import {AcceptWorkResultComponent} from '@ui/modals/accept-work-result/accept-work-result.component'
import {BehaviorSubject, combineLatest, Observable, Subject} from 'rxjs'
import {
  getWinnerTeamId,
  isAcceptWorkResultBtn,
  isFinishApplicantsVoteBtn,
  isFinishVoteBtn,
  isShowAddRewardBtn,
  isStartWorkBtn,
  prepareIsRejectBtnData,
  prepareTeamsData,
  prepareTeamsHeaderData
} from '@pages/entity-page/votings-template/functions'
import {ActivatedRoute} from '@angular/router'
import {IScore} from '@services/interface'
import {FinishApplicantsVotingComponent} from '@ui/modals/finish-applicants-voting/finish-applicants-voting.component'
import {Web3TemplateInterface} from "@pages/entity-page/web3-template/web3-template.interface";
import {log} from "@libs/log";
import {Async} from "@libs/decorators";

@Component({
  selector: 'app-votings-template',
  templateUrl: './votings-template.component.html',
  styleUrls: ['./votings-template.component.scss']
})
export class VotingsTemplateComponent {

  @Input() public readonly contract!: GrantsVariationType
  @Async() @Input('grant') public readonly grant$!: Observable<ContractGrantModel>

  private readonly destroyed$ = new Subject()

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
    log('VotingsTemplateComponent::entityData$'),
    publishReplay(1),
    refCount()
  )

  constructor(
    private route: ActivatedRoute, // eslint-disable-line
    private readonly dialog: MatDialog, // eslint-disable-line
    public disruptiveContractService: DisruptiveContractService, // eslint-disable-line
    private readonly snackBar: MatSnackBar, // eslint-disable-line
    public signerService: SignerService, // eslint-disable-line
    private readonly cdr: ChangeDetectorRef,// eslint-disable-line
    public userService: UserService // eslint-disable-line
  ) {
  }

  signup(): void {
    this.signerService.login()
      .pipe(take(1))
      .subscribe(() => {
      }, (error) => {
        this.snackBar.open(error, translate('messages.ok'))
      })
  }

}
