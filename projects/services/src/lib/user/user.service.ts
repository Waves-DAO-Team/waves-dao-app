import { Inject, Injectable } from '@angular/core'
import { RoleEnum, RoleRowInterface, UserDataInterface } from '@services/user/user.interface'
import { SignerService } from '@services/signer/signer.service'
import { ContractService } from '@services/contract/contract.service'
import { BehaviorSubject, combineLatest } from 'rxjs'
import { map, publishReplay, refCount, tap } from 'rxjs/operators'
import { ContractGrantRawModel } from '@services/contract/contract.model'
import { API, AppApiInterface } from '@constants'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public data: BehaviorSubject<UserDataInterface> = new BehaviorSubject<UserDataInterface>({
    userRole: RoleEnum.unauthorized,
    userAddress: '',
    addressDAOMember: [],
    owner: '',
    addressWorkGroup: [],
    masterAddress: '',
    roles: {
      isMaster: false,
      isDAO: false,
      isWG: false,
      isOwner: false,
      isAuth: false,
      isUnauthorized: true
    },
    voted: [],
    apply: [],
    balance: ''
  })

  lastAddress = ''

  public readonly isBalanceMoreCommission$ = this.data
    .pipe(
      map((e) => e.balance.length > 0 && (parseInt(e.balance, 10) > 0.005))
    )

  private readonly data$ = combineLatest([this.signerService.user, this.contractService.stream])
    .pipe(
      tap(([userAddress, contract]) => {
        const addressWorkGroup = Object.keys(contract?.working?.group?.member || {})
        const addressDAOMember = Object.keys(contract?.dao?.member || {})
        const userAddressText = userAddress && userAddress.address ? userAddress.address : ''
        const userBalanceText = userAddress && userAddress.balance ? userAddress.balance : '0'
        const dr = this.defineRol(contract?.owner, contract.address, userAddressText, addressDAOMember, addressWorkGroup)
        const newData: UserDataInterface = {
          addressDAOMember,
          addressWorkGroup,
          owner: contract?.owner,
          masterAddress: contract.address,
          userAddress: userAddressText,
          userRole: dr.mainRole,
          roles: dr.roles,
          voted: this.defineVoted(userAddressText, contract?.tasks || {}),
          apply: this.defineApply(userAddressText, contract?.tasks || {}),
          balance: userBalanceText
        }
        this.data.next(newData)
        if (userAddressText !== this.lastAddress) {
          this.lastAddress = userAddressText
        }
        console.log('user data: ', this.data.getValue())
      }),
      publishReplay(1),
      refCount()
    ).subscribe()

  constructor (
    @Inject(API) private readonly api: AppApiInterface,
    private readonly signerService: SignerService,
    private readonly contractService: ContractService
  ) {}

  private defineApply (userAddress: string, tasks: {[index: string]: ContractGrantRawModel}): string[] {
    const result: string[] = []
    if (tasks) {
      for (const key of Object.keys(tasks)) {
        if (
          userAddress &&
          tasks &&
          tasks[key]?.applicants?.value.includes(userAddress)
        ) {
          result.push(key)
        }
      }
    }

    return result
  }

  private defineVoted (userAddress: string, tasks: {[s: string]: ContractGrantRawModel}): string[] {
    const result = []
    if (tasks) {
      for (const key of Object.keys(tasks)) {
        const grant: ContractGrantRawModel = tasks[key]
        if (grant.voted && Object.keys(grant.voted).includes(userAddress)) {
          result.push(key)
        }
      }
    }

    return result
  }

  private defineRol (
    ownerAddress: string,
    masterAddress: string,
    userAddress: string,
    addressDAOMember: string[],
    addressWorkGroup: string[]
  ): RoleRowInterface {
    const result: RoleRowInterface = {
      mainRole: RoleEnum.unauthorized,
      roles: {
        isMaster: false,
        isDAO: false,
        isWG: false,
        isAuth: false,
        isOwner: false,
        isUnauthorized: true
      }
    }
    if (userAddress !== '') {
      result.mainRole = result.mainRole === RoleEnum.unauthorized ? RoleEnum.authorized : result.mainRole
      result.roles.isAuth = true
      result.roles.isUnauthorized = false
    }
    if (addressDAOMember.includes(userAddress)) {
      result.mainRole = RoleEnum.daoMember
      result.roles.isDAO = true
      result.roles.isUnauthorized = false
    }
    if (addressWorkGroup.includes(userAddress)) {
      result.mainRole = RoleEnum.workingGroup
      result.roles.isWG = true
      result.roles.isUnauthorized = false
    }
    if (masterAddress === userAddress) {
      result.mainRole = RoleEnum.master
      result.roles.isMaster = true
      result.roles.isUnauthorized = false
    }
    if (ownerAddress === userAddress) {
      result.mainRole = RoleEnum.owner
      result.roles.isOwner = true
      result.roles.isUnauthorized = false
    }
    return result
  }
}
