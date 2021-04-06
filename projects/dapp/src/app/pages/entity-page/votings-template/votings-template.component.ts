import {ChangeDetectorRef, Component, Input, OnDestroy} from '@angular/core'
import {ContractGrantModel} from '@services/contract/contract.model'
import { GrantsVariationType} from '@services/static/static.model'
import {DisruptiveContractService} from '@services/contract/disruptive-contract.service'
import {MatSnackBar} from '@angular/material/snack-bar'
import {SignerService} from '@services/signer/signer.service'
import {map, publishReplay, refCount, take, takeUntil, tap} from 'rxjs/operators'
import {translate} from '@ngneat/transloco'
import {MatDialog} from '@angular/material/dialog'
import {UserService} from '@services/user/user.service'
import {combineLatest, Observable, Subject} from 'rxjs'
import {ActivatedRoute} from '@angular/router'
import {Web3TemplateInterface} from '@pages/entity-page/web3-template/web3-template.interface'
import {log} from '@libs/log'
import {Async, DestroyedSubject} from '@libs/decorators'
import {getEntityData} from '@pages/entity-page/functions'
import {HashService} from "@services/hash/hash.service";
import {CommunityContractService} from "@services/contract/community-contract.service";
import {VotingsContractService} from "@services/contract/votings-contract.service";

@Component({
  selector: 'app-votings-template',
  templateUrl: './votings-template.component.html',
  styleUrls: ['./votings-template.component.scss']
})
export class VotingsTemplateComponent implements OnDestroy {

  @Input() public readonly contract!: GrantsVariationType
  @Async() @Input('grant') public readonly grant$!: Observable<ContractGrantModel>

  @DestroyedSubject() private readonly destroyed$!: Subject<null>

  public entityData$: Observable<Web3TemplateInterface> = combineLatest([this.userService.stream$, this.grant$])
    .pipe(
    takeUntil(this.destroyed$),
    map(([user, grant]) => (getEntityData(user, grant))),

    log('VotingsTemplateComponent::entityData$'),
    publishReplay(1),
    refCount()
  )

  public readonly isResetHashBtn$: Observable<boolean> = this.userService.data
    .pipe(
      map(data => data.roles.isWG)
    )

  public readonly isVoteForTask$: Observable<boolean | null> = combineLatest([this.userService.stream$, this.grant$])
    .pipe(
      map(([user, grant]) => {
        if (user.userAddress && grant?.status?.value === "proposed") {
          if(grant?.voted && grant.voted[user.userAddress]) {
            return grant.voted[user.userAddress] ? true : false
          } else {
            return false
          }
        }
          return null
      })
    )

  isFinishApplicantsVoteBtn$: Observable<boolean> = combineLatest([this.userService.stream$, this.grant$])
    .pipe(
      map( ([user, grant]) => {
        if (grant?.status?.value === "proposed" && user.roles.isWG) {
          return true
        }
        return false
      }),
      tap( e => console.log('+++isFinishApplicantsVoteBtn$', e))
    )

  isRejectBtn$: Observable<boolean> = this.entityData$
    .pipe(
      takeUntil(this.destroyed$),
      map((web3Grant: Web3TemplateInterface) => web3Grant.isCanceled && web3Grant.isWG)
    )

  constructor (
    public hashService: HashService,
    public votingsContractService: VotingsContractService,
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

  signup (): void {
    this.signerService.login()
      .pipe(take(1))
      .subscribe(() => {
      }, (error) => {
        this.snackBar.open(error, translate('messages.ok'))
      })
  }

  ngOnDestroy (): void {}

  hide (taskId: string): void {
    this.communityContractService.hide(taskId).subscribe()
  }

  resetHash (id: string, link: string): void {
    this.hashService.init(link)  // eslint-disable-line @typescript-eslint/no-floating-promises
      .then((hash: string = '') => {
        this.communityContractService.resetHash(id, hash).subscribe()
      })
  }

  vote (value: 'like' | 'dislike', id: string): void {
    this.disruptiveContractService.voteForTaskProposal(id, value).subscribe({
      complete: () => {
        this.cdr.markForCheck()
      }
    })
  }

  finishTaskProposalVoting(entityData: Web3TemplateInterface, id: string) {
    this.votingsContractService.finishTaskProposalVoting(id).subscribe({
      complete: () => {
        this.cdr.markForCheck()
      }
    })
  }

  reject (id: string): void {
    this.communityContractService.rejectTask(id).subscribe()
  }
}
