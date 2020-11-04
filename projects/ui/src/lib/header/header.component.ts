import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core'
import {
  APP_CONSTANTS,
  AppConstantsInterface
} from '@constants'
import { SignerService } from '@services/signer/signer.service'
import { SignerUser } from '@services/signer/signer.model'
import { Observable } from 'rxjs'
import { MatSnackBar } from '@angular/material/snack-bar'
import { translate } from '@ngneat/transloco'

@Component({
  selector: 'ui-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  public readonly user$: Observable<SignerUser> = this.signerService.user

  constructor (
      @Inject(APP_CONSTANTS) public readonly constants: AppConstantsInterface,
      private signerService: SignerService,
      private snackBar: MatSnackBar
  ) { }

  ngOnInit (): void {
  }

  signupHandler () {
    this.signerService.login().subscribe(() => {}, (error) => {
      this.snackBar.open(error, translate('messages.ok'))
    })
  }

  logoutHandler () {
    this.signerService.logout().subscribe(() => {}, (error) => {
      this.snackBar.open(error, translate('messages.ok'))
    })
  }
}
