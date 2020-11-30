import { Injectable } from '@angular/core'
import { RoleEnum, RoleRowInterface, UserDataInterface } from '@services/user/user.interface'
import { SignerService } from '@services/signer/signer.service'
import { ContractService } from '@services/contract/contract.service'
import { environment } from '../../../../dapp/src/environments/environment'
import { BehaviorSubject, combineLatest } from 'rxjs'
import { catchError, publishReplay, refCount, tap } from 'rxjs/operators'
import { ContractGrantModel, ContractGrantRawModel } from '@services/contract/contract.model'
import { PopupService } from '@services/popup/popup.service'
import { AddTextObjInterface } from '@services/popup/popup.interface'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public data: BehaviorSubject<UserDataInterface> = new BehaviorSubject<UserDataInterface>({
    userRole: RoleEnum.unauthorized,
    userAddress: '',
    DAOMemberAddress: [],
    WorkGroupAddress: [],
    masterAddress: '',
    roles: {
      isMaster: false,
      isDAO: false,
      isWG: false,
      isAuth: false
    },
    voted: [],
    apply: [],
    balance: ''
  })

  lastAddress = ''

  // @ts-ignore
  private readonly data$ = combineLatest([this.signerService.user, this.contractService.stream])
    .pipe(
      tap(([userAddress, contract]) => {
        const masterAddress = environment.apis.contractAddress
        const WorkGroupAddress = Object.keys(contract.working?.group?.member)
        const DAOMemberAddress = Object.keys(contract.dao.member)
        const dr = this.defineRol(masterAddress, userAddress.address, DAOMemberAddress, WorkGroupAddress)
        const newData: UserDataInterface = {
          DAOMemberAddress,
          WorkGroupAddress,
          masterAddress: environment.apis.contractAddress,
          userAddress: userAddress.address,
          userRole: dr.mainRole,
          roles: dr.roles,
          voted: this.defineVoted(userAddress.address, contract.tasks),
          apply: this.defineApply(userAddress.address, contract.tasks),
          balance: userAddress.balance
        }
        if (JSON.stringify(this.data.getValue()) !== JSON.stringify(newData)) {
          this.data.next(newData)
          if (userAddress.address !== this.lastAddress) {
            this.popupService.add(userAddress.address, 'Login')
            this.lastAddress = userAddress.address
          }
          console.log('user data: ', this.data.getValue())
        }
      }),
      publishReplay(1),
      refCount()
    ).subscribe()

  constructor (
    private signerService: SignerService, private contractService: ContractService, private popupService: PopupService
  ) {}

  private defineApply (userAddress: string, tasks: ContractGrantRawModel): string[] {
    const result: string[] = []
    if (tasks) {
      for (const key of Object.keys(tasks)) {
        // @ts-ignore
        if (userAddress && tasks[key]?.applicants?.value.includes(userAddress)) {
          result.push(key)
        }
      }
    }

    return result
  }

  private defineVoted (userAddress: string, tasks: ContractGrantRawModel): string[] {
    const result = []
    if (tasks) {
      // @ts-ignore
      for (const key of Object.keys(tasks)) {
        // for (const key in tasks) {
        // @ts-ignore
        const grant = tasks[key]
        if (grant.voted && Object.keys(grant.voted).includes(userAddress)) {
          result.push(key)
        }
      }
    }

    return result
  }

  private defineRol (masterAddress: string, userAddress: string, DAOMemberAddress: string[], WorkGroupAddress: string[]): RoleRowInterface {
    const result: RoleRowInterface = {
      mainRole: RoleEnum.unauthorized,
      roles: {
        isMaster: false,
        isDAO: false,
        isWG: false,
        isAuth: false
      }
    }
    if (userAddress !== '') {
      result.mainRole = result.mainRole === RoleEnum.unauthorized ? RoleEnum.authorized : result.mainRole
      result.roles.isAuth = true
    }
    if (DAOMemberAddress.includes(userAddress)) {
      result.mainRole = RoleEnum.DAOMember
      result.roles.isDAO = true
    }
    if (WorkGroupAddress.includes(userAddress)) {
      result.mainRole = RoleEnum.workingGroup
      result.roles.isWG = true
    }
    if (masterAddress === userAddress) {
      result.mainRole = RoleEnum.master
      result.roles.isMaster = true
    }
    return result
  }

  isBalanceMoreCommission (): boolean {
    let result = false
    if (this.data.getValue().balance.length > 0 && parseInt(this.data.getValue().balance) > 0.005) {
      result = true
    }
    return result
  }
}
