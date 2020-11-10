import { Injectable } from '@angular/core'
import { RoleEnum } from '@services/user/user.interface'
import { SignerService } from '@services/signer/signer.service'
import { ContractService } from '@services/contract/contract.service'
import { environment } from '../../../../dapp/src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  otherData = {
    DAOMemberAddress: Array(0),
    WorkGroupAddress: Array(0),
    masterAddress: environment.apis.contractAddress
  }

  userData = {
    userRole: RoleEnum.unauthorized,
    userAddress: ''
  };

  constructor (
    private signerService: SignerService,
    private contractService: ContractService
  ) {
    this._subscribe()
  }

  _subscribe (): void {
    this.signerService.user.subscribe((e) => {
      if (e.address) {
        this.userData.userAddress = e.address
        this._defineRol()
      }
    })
    this.contractService.streamDAO.subscribe((e) => {
      this.otherData.DAOMemberAddress = (Object.keys(e[0]) as [])
      this._defineRol()
    })
    this.contractService.streamWorkGroup.subscribe((e) => {
      this.otherData.WorkGroupAddress = (Object.keys(e[0].member) as [])
      this._defineRol()
    })
  }

  logout () {
    this.userData = {
      userRole: RoleEnum.unauthorized,
      userAddress: ''
    }
  }

  _defineRol (): void {
    if (this.userData.userAddress === '') {
      this.userData.userRole = RoleEnum.unauthorized
    } else if (this.userData.userAddress) {
      this.userData.userRole = RoleEnum.authorized
    } else if (this.otherData.DAOMemberAddress.includes(this.userData.userAddress)) {
      this.userData.userRole = RoleEnum.DAOMember
    } else if (this.otherData.WorkGroupAddress.includes(this.userData.userAddress)) {
      this.userData.userRole = RoleEnum.workingGroup
    }
    if (this.otherData.masterAddress === this.userData.userAddress) {
      this.userData.userRole = RoleEnum.workingGroup
    }
  }
}
