import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit
} from '@angular/core'
import {
  APP_CONSTANTS,
  AppConstantsInterface
} from '@constants'
import { SignerService } from '@services/signer/signer.service'
import { SignerUser } from '@services/signer/signer.model'
import { Observable, Subject } from 'rxjs'
import { MatSnackBar } from '@angular/material/snack-bar'
import { translate } from '@ngneat/transloco'
import { Router } from '@angular/router'
import { UserService } from '@services/user/user.service'
import { RoleEnum } from '@services/user/user.interface'
import { Location } from '@angular/common'
import { ContractService } from '@services/contract/contract.service'
import { PopupService } from '@services/popup/popup.service'
import { take, takeUntil } from 'rxjs/operators'
import { DestroyedSubject } from '@libs/decorators/destroyed-subject.decorator'

@Component({
  selector: 'ui-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {
  public readonly user$: Observable<SignerUser> = this.signerService.user
  userRole = RoleEnum.unauthorized
  RoleEnum = RoleEnum;

  // Subject activate if component destroyed
  // And unsubscribe all subscribers used takeUntil(this.destroyed$)
  @DestroyedSubject() private readonly destroyed$!: Subject<null>;

  constructor (
    @Inject(APP_CONSTANTS) public readonly constants: AppConstantsInterface,
    private signerService: SignerService,
    private snackBar: MatSnackBar,
    public router: Router,
    public userService: UserService,
    public contractService: ContractService,
    private location: Location,
    private cdr: ChangeDetectorRef,
    private popupService: PopupService
  ) {
  }

  ngOnInit (): void {
    this.subscribe()
  }

  signupHandler () {
    this.signerService.login().subscribe(() => {
    }, (error) => {
      this.snackBar.open(error, translate('messages.ok'))
    })
  }

  logoutHandler () {
    // Get one value after click
    this.signerService.logout().pipe(take(1)).subscribe((e) => {
      this.contractService.refresh()
    }, (error) => {
      this.snackBar.open(error, translate('messages.ok'))
    })
  }

  goBack (): void {
    this.location.back()
  }

  private subscribe (): void {
    this.userService.data
      .pipe(takeUntil(this.destroyed$))
      .subscribe((newData) => {
        this.userRole = newData.userRole

        // After change contract mark component as changed
        // Repaint component an next tick
        this.cdr.markForCheck()
      })
  }

  ngOnDestroy () {}
}
