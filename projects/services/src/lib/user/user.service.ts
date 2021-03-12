import {Inject, Injectable} from '@angular/core'
import {RoleEnum, RoleRowInterface, UserDataInterface} from '@services/user/user.interface'
import {SignerService} from '@services/signer/signer.service'
import {ContractService} from '@services/contract/contract.service'
import {BehaviorSubject, combineLatest} from 'rxjs'
import {
  map,
  publishReplay,
  refCount,
} from 'rxjs/operators'
import {ContractGrantRawModel} from '@services/contract/contract.model'
import {API, AppApiInterface} from '@constants'
import {log} from '@libs/log/log.rxjs-operator'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public data: BehaviorSubject<UserDataInterface> = new BehaviorSubject<UserDataInterface>({
    userRole: RoleEnum.unauthorized,
    userAddress: '',
    addressDAOMember: [],
    manager: '',
    addressWorkGroup: [],
    masterAddress: '',
    roles: {
      isMaster: false,
      isDAO: false,
      isWG: false,
      isManager: false,
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

  public readonly stream$ = combineLatest([this.signerService.user, this.contractService.membershipStream])
    .pipe(
      log('%c UserService::stream$::input', 'color: pink'),
      map(([user, contract]) => {
        const addressWorkGroup = Object.keys(contract?.payload?.working?.group?.member || {})
        const addressDAOMember = Object.keys(contract?.payload?.dao?.member || {})
        const userAddressText = user && user.address ? user.address : ''
        const userBalanceText = user && user.balance ? user.balance : '0'
        const dr = this.defineRol(
            contract?.payload?.manager || '',
            contract.payload?.address || '',
            userAddressText,
            addressDAOMember,
            addressWorkGroup
        )
        const newData: UserDataInterface = {
          addressDAOMember,
          addressWorkGroup,
          manager: contract?.payload?.manager || '',
          masterAddress: contract.payload?.address || '',
          userAddress: userAddressText,
          userRole: dr.mainRole,
          roles: dr.roles,
          // Todo delete unused property
          voted: this.defineVoted(userAddressText, {}),
          // Todo delete unused property
          apply: this.defineApply(userAddressText, {}),
          balance: userBalanceText
        }

        this.data.next(newData)

        if (userAddressText !== this.lastAddress) {
          this.lastAddress = userAddressText
        }

        return newData
      }),
      log('%c UserService::stream$::output', 'color: pink'),
      publishReplay(1),
      refCount()
    )

  constructor (
    @Inject(API) private readonly api: AppApiInterface, // eslint-disable-line
    private readonly signerService: SignerService, // eslint-disable-line
    private readonly contractService: ContractService // eslint-disable-line
  ) {}

  private defineApply (userAddress: string, tasks: { [index: string]: ContractGrantRawModel }): string[] {
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

  private defineVoted (userAddress: string, tasks: { [s: string]: ContractGrantRawModel }): string[] {
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
    managerAddress: string,
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
        isManager: false,
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
    if (managerAddress === userAddress) {
      result.mainRole = RoleEnum.manager
      result.roles.isManager = true
      result.roles.isUnauthorized = false
    }
    return result
  }
}
