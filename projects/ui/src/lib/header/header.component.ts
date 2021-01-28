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
import { SignerUser } from '@services/signer/signer.model'
import { Observable, Subject } from 'rxjs'
import { MatSnackBar } from '@angular/material/snack-bar'
import { translate } from '@ngneat/transloco'
import { Router } from '@angular/router'
import { UserService } from '@services/user/user.service'
import { roleEnum } from '@services/user/user.interface'
import { Location } from '@angular/common'
import { ContractService } from '@services/contract/contract.service'
import { map, take, takeUntil } from 'rxjs/operators'
import { DestroyedSubject } from '@libs/decorators/destroyed-subject.decorator'
import { StaticService } from '@services/static/static.service'

@Component({
  selector: 'ui-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {
  public readonly user$: Observable<SignerUser> = this.signerService.user

  // Subject activate if component destroyed
  // And unsubscribe all subscribers used takeUntil(this.destroyed$)
  public readonly contractsList$ = this.staticService.getContactsList()
  public readonly roleEnum = roleEnum
  isToggleMenuOpen = false
  // @ts-ignore
  @DestroyedSubject() private readonly destroyed$!: Subject<null>
  public readonly userRole$ = this.userService.data.pipe(takeUntil(this.destroyed$), map((data) => data.userRole))
  constructor (
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

  ngOnDestroy () {}
}
