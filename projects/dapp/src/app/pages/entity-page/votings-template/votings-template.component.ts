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

@Component({
  selector: 'app-votings-template',
  templateUrl: './votings-template.component.html',
  styleUrls: ['./votings-template.component.scss']
})
export class VotingsTemplateComponent implements OnDestroy {

  @Input() public readonly contract!: GrantsVariationType
  @Async() @Input('grant') public readonly grant$!: Observable<ContractGrantModel>

  @DestroyedSubject() private readonly destroyed$!: Subject<null>

  public entityData$: Observable<Web3TemplateInterface> = combineLatest([this.userService.stream$, this.grant$]).pipe(
    takeUntil(this.destroyed$),
    map(([user, grant]) => (getEntityData(user, grant))),
    log('VotingsTemplateComponent::entityData$'),
    publishReplay(1),
    refCount()
  )

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

  signup (): void {
    this.signerService.login()
      .pipe(take(1))
      .subscribe(() => {
      }, (error) => {
        this.snackBar.open(error, translate('messages.ok'))
      })
  }

  ngOnDestroy (): void {}

}
