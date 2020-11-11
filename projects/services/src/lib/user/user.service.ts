import { Injectable } from '@angular/core'
import { OtherDataInterface, RoleEnum, UserDataInterface } from '@services/user/user.interface'
import { SignerService } from '@services/signer/signer.service'
import { ContractService } from '@services/contract/contract.service'
import { environment } from '../../../../dapp/src/environments/environment'
import { BehaviorSubject } from 'rxjs'
import { translate } from '@ngneat/transloco'
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  otherData = new BehaviorSubject<OtherDataInterface>({
    DAOMemberAddress: [],
    WorkGroupAddress: [],
    masterAddress: environment.apis.contractAddress
  })

  userData = new BehaviorSubject<UserDataInterface>({
    userRole: RoleEnum.unauthorized,
    userAddress: ''
  })

  constructor (
    private signerService: SignerService,
    private contractService: ContractService,
    private snackBar: MatSnackBar
  ) {
    this.subscribe()
  }

  private subscribe (): void {
    this.signerService.user.subscribe((e) => {
      if (e.address) {
        this.userData.next({
          ...this.userData.getValue(),
          userAddress: e.address
        })
        this.defineRol()
      }
    })
    this.contractService.streamDAO.subscribe((e) => {
      this.otherData.next({
        ...this.otherData.getValue(),
        DAOMemberAddress: (Object.keys(e[0]) as [])
      })
      this.defineRol()
    })
    this.contractService.streamWorkGroup.subscribe((e) => {
      this.otherData.next({
        ...this.otherData.getValue(),
        WorkGroupAddress: (Object.keys(e[0].member) as [])
      })
      this.defineRol()
    })
  }

  public signup (): void {
    this.signerService.login().subscribe(() => {
    }, (error) => {
      this.snackBar.open(error, translate('messages.ok'))
    })
  }

  public logout (): void {
    this.userData.next({
      userRole: RoleEnum.unauthorized,
      userAddress: ''
    })
  }

  private defineRol (): void {
    if (this.userData.value.userAddress === '') {
      this.userData.next({
        ...this.userData.getValue(),
        userRole: RoleEnum.unauthorized
      })
    } else if (this.userData.value.userAddress) {
      this.userData.next({
        ...this.userData.getValue(),
        userRole: RoleEnum.authorized
      })
    } else if (this.otherData.value.DAOMemberAddress.includes(this.userData.value.userAddress)) {
      this.userData.next({
        ...this.userData.getValue(),
        userRole: RoleEnum.DAOMember
      })
    } else if (this.otherData.value.WorkGroupAddress.includes(this.userData.value.userAddress)) {
      this.userData.next({
        ...this.userData.getValue(),
        userRole: RoleEnum.workingGroup
      })
    }
    if (this.otherData.value.masterAddress === this.userData.value.userAddress) {
      this.userData.next({
        ...this.userData.getValue(),
        userRole: RoleEnum.master
      })
    }
  }
}
