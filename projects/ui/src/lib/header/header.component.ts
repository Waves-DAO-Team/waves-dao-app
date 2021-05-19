import {
  ChangeDetectionStrategy,
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
import {combineLatest, Observable, Subject } from 'rxjs'
import { MatSnackBar } from '@angular/material/snack-bar'
import { translate } from '@ngneat/transloco'
import { Router } from '@angular/router'
import { UserService } from '@services/user/user.service'
import { Location } from '@angular/common'
import { ContractService } from '@services/contract/contract.service'
import {map, take, takeUntil, tap} from 'rxjs/operators'
import { DestroyedSubject } from '@libs/decorators/destroyed-subject.decorator'
import { StaticService } from '@services/static/static.service'
import { log } from '@libs/log'
import { HeaderComponentUserModel } from './header.model'
import {RoleEnum} from '@services/user/user.interface'
import {Clipboard} from '@angular/cdk/clipboard'

@Component({
  selector: 'ui-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {
  public roleEnum = RoleEnum

  @DestroyedSubject() private readonly destroyed$!: Subject<null>

  public readonly user$: Observable<HeaderComponentUserModel> =
      combineLatest([this.signerService.user, this.userService.stream$]).pipe(
          takeUntil(this.destroyed$),
          log('HeaderComponent::user$'),
          map(([balance, user]) => ({
              ...user,
              ...balance
            }))
      )

  // Subject activate if component destroyed
  // And unsubscribe all subscribers used takeUntil(this.destroyed$)
  public readonly contractsList$ = this.staticService.getContactsList()
  isToggleMenuOpen = false

  constructor (
    private clipboard: Clipboard,
    @Inject(APP_CONSTANTS) public readonly constants: AppConstantsInterface,
    private readonly signerService: SignerService,
    private readonly snackBar: MatSnackBar,
    public router: Router,
    public userService: UserService,
    public contractService: ContractService,
    private readonly staticService: StaticService,
    private readonly location: Location
  ) {
  }

  ngOnInit (): void {}

  signupHandler (): void {
    this.signerService.login().subscribe(() => {
    }, (error) => {
      this.snackBar.open(error, translate('messages.ok'))
    })
  }

  copyUserName (str: string): void {
    const pending = this.clipboard.beginCopy(str)

    let remainingAttempts = 3
    const attempt = () => {
      const result = pending.copy()
      if (!result && --remainingAttempts) {
        setTimeout(attempt)
      } else {
        pending.destroy()
      }
    }
    attempt()
  }

  logoutHandler (): void {
    // Get one value after click
    this.signerService.logout().pipe(take(1)).subscribe(() => {
      this.contractService.refresh()
    }, (error) => {
      this.snackBar.open(error, translate('messages.ok'))
    })
  }

  goBack (): void {
    this.location.back()
  }

  ngOnDestroy (): void {}
}
