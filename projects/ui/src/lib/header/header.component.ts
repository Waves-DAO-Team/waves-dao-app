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
import { environment } from '../../../../dapp/src/environments/environment'
import { ContractService } from '@services/contract/contract.service'
import {PopupService} from "@services/popup/popup.service";
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
  routingPath = environment.routing
  constructor (
    @Inject(APP_CONSTANTS) public readonly constants: AppConstantsInterface,
    private signerService: SignerService,
    private snackBar: MatSnackBar,
    public router: Router,
    public userService: UserService,
    public contractService: ContractService,
    private location: Location,
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
    this.signerService.logout().subscribe(() => {
    }, (error) => {
      this.snackBar.open(error, translate('messages.ok'))
    })
  }

  goBack (): void {
    this.location.back()
  }

  private subscribe (): void {
    this.userService.data.subscribe((newData) => {
      this.userRole = newData.userRole
    })
  }

  test () {
    this.popupService.add('Lorem 1 2GweZpRK94t3KNXFZwqhoZBYzHNUuCCeCpGPhF3qihaX')
    this.popupService.add('Lorem 2 2GweZpRK94t3KNXFZwqhoZBYzHNUuCCeCpGPhF3qihaX')
    this.popupService.add('Lorem 3 2GweZpRK94t3KNXFZwqhoZBYzHNUuCCeCpGPhF3qihaX')
    this.popupService.add('Lorem 4 2GweZpRK94t3KNXFZwqhoZBYzHNUuCCeCpGPhF3qihaX')
    this.popupService.add('Lorem 5 2GweZpRK94t3KNXFZwqhoZBYzHNUuCCeCpGPhF3qihaX')
    // payment: [{
    //   assetId: 'string',
    //   amount: LONG,
    // }],
    // this.contractService.startWork('2GweZpRK94t3KNXFZwqhoZBYzHNUuCCeCpGPhF3qihaX')
    // this.contractService.applyForTask('3YmhzN8keAksJeyvk5grfJ9c3mTCFAzCdTuL8w2yHoQ3', 'xxxx')
    // this.contractService.finishApplicantsVoting('4hozrKrn8u2Aqck24KE3Y4UgNWzGoBGkkJJJcVuPQFhg')
    // this.contractService.startWork('4hozrKrn8u2Aqck24KE3Y4UgNWzGoBGkkJJJcVuPQFhg')
    // this.contractService.acceptWorkResult('4hozrKrn8u2Aqck24KE3Y4UgNWzGoBGkkJJJcVuPQFhg')
    // this.contractService.voteForTaskProposal('9uPafD46iaZ5p5PHgUK1XWpvCWntay9h96PQZ5PetPRy', 1)
    // this.contractService.finishTaskProposalVoting('2GweZpRK94t3KNXFZwqhoZBYzHNUuCCeCpGPhF3qihaX')
  }

  test2() {
    this.popupService.rmLast()
  }
}
