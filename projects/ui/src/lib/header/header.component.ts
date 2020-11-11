import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core'
import {
  APP_CONSTANTS,
  AppConstantsInterface
} from '@constants'
import { SignerService } from '@services/signer/signer.service'
import { SignerUser } from '@services/signer/signer.model'
import { Observable, of } from 'rxjs'
import { MatSnackBar } from '@angular/material/snack-bar'
import { translate } from '@ngneat/transloco'
import { Router } from '@angular/router'
import { UserService } from '@services/user/user.service'
import { RoleEnum } from '@services/user/user.interface'
import { Location } from '@angular/common'

@Component({
  selector: 'ui-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  public readonly user$: Observable<SignerUser> = this.signerService.user
  userRole = RoleEnum.unauthorized
  RoleEnum = RoleEnum;
  constructor (
    @Inject(APP_CONSTANTS) public readonly constants: AppConstantsInterface,
    private signerService: SignerService,
    private snackBar: MatSnackBar,
    public router: Router,
    public userService: UserService,
    private location: Location
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
    this.signerService.logout().subscribe(() => {
    }, (error) => {
      this.snackBar.open(error, translate('messages.ok'))
    })
  }

  goBack (): void {
    this.location.back()
  }

  private subscribe (): void {
    this.userService.userData.subscribe((newData) => {
      this.userRole = newData.userRole
    })
  }
}
