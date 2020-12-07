import { Inject, Injectable } from '@angular/core'
import { RoleEnum, RoleRowInterface, UserDataInterface } from '@services/user/user.interface'
import { SignerService } from '@services/signer/signer.service'
import { ContractService } from '@services/contract/contract.service'
import { BehaviorSubject, combineLatest } from 'rxjs'
import { map, publishReplay, refCount, tap } from 'rxjs/operators'
import { ContractGrantRawModel } from '@services/contract/contract.model'
import { PopupService } from '@services/popup/popup.service'
import { API, AppApiInterface } from '@constants'

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
      isAuth: false,
      isUnauthorized: true
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
        const WorkGroupAddress = Object.keys(contract?.working?.group?.member || {})
        const DAOMemberAddress = Object.keys(contract?.dao?.member || {})
        const userAddressText = userAddress && userAddress.address ? userAddress.address : ''
        const userBalanceText = userAddress && userAddress.balance ? userAddress.balance : '0'
        const dr = this.defineRol(contract.address, userAddressText, DAOMemberAddress, WorkGroupAddress)
        const newData: UserDataInterface = {
          DAOMemberAddress,
          WorkGroupAddress,
          masterAddress: contract.address,
          userAddress: userAddressText,
          userRole: dr.mainRole,
          roles: dr.roles,
          voted: this.defineVoted(userAddressText, contract?.tasks || {}),
          apply: this.defineApply(userAddressText, contract?.tasks || {}),
          balance: userBalanceText
        }
        // if (JSON.stringify(this.data.getValue()) !== JSON.stringify(newData)) {
        this.data.next(newData)
        if (userAddressText !== this.lastAddress) {
          this.popupService.add(userAddressText, 'Login')
          this.lastAddress = userAddressText
        }
        console.log('user data: ', this.data.getValue())
        // }
      }),
      publishReplay(1),
      refCount()
    ).subscribe()

  public readonly isBalanceMoreCommission$ = this.data
    .pipe(
      map((e) => {
        return e.balance.length > 0 && (parseInt(e.balance, 10) > 0.005)
      })
    )

  constructor (
    @Inject(API) private readonly api: AppApiInterface,
    private signerService: SignerService,
    private contractService: ContractService,
    private popupService: PopupService
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
        isAuth: false,
        isUnauthorized: true
      }
    }
    if (userAddress !== '') {
      result.mainRole = result.mainRole === RoleEnum.unauthorized ? RoleEnum.authorized : result.mainRole
      result.roles.isAuth = true
      result.roles.isUnauthorized = false
    }
    if (DAOMemberAddress.includes(userAddress)) {
      result.mainRole = RoleEnum.DAOMember
      result.roles.isDAO = true
      result.roles.isUnauthorized = false
    }
    if (WorkGroupAddress.includes(userAddress)) {
      result.mainRole = RoleEnum.workingGroup
      result.roles.isWG = true
      result.roles.isUnauthorized = false
    }
    if (masterAddress === userAddress) {
      result.mainRole = RoleEnum.master
      result.roles.isMaster = true
      result.roles.isUnauthorized = false
    }
    return result
  }
}
