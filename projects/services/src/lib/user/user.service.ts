import { Injectable } from '@angular/core'
import { RoleEnum, RoleRowInterface, UserDataInterface } from '@services/user/user.interface'
import { SignerService } from '@services/signer/signer.service'
import { ContractService } from '@services/contract/contract.service'
import { environment } from '../../../../dapp/src/environments/environment'
import { BehaviorSubject, combineLatest } from 'rxjs'
import { publishReplay, refCount, tap } from 'rxjs/operators'
import { ContractGrantRawModel } from '@services/contract/contract.model'

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
    voted: []
  })

  private readonly data$ = combineLatest([this.signerService.user, this.contractService.stream])
    .pipe(
      tap(([userAddress, contract]) => {
        const masterAddress = environment.apis.contractAddress
        // console.log('------', contract)
        const WorkGroupAddress = Object.keys(contract.working.group.member)
        const DAOMemberAddress = Object.keys(contract.dao.member)
        const dr = this.defineRol(masterAddress, userAddress.address, DAOMemberAddress, WorkGroupAddress)
        const dv = this.defineVoted(userAddress.address, contract.tasks)
        this.data.next({
          DAOMemberAddress,
          WorkGroupAddress,
          masterAddress,
          userAddress: userAddress.address,
          userRole: dr.mainRole,
          roles: dr.roles,
          voted: dv
        })
        console.log('user data: ', this.data.getValue())
      }),
      publishReplay(1),
      refCount()
    ).subscribe()

  constructor (
    private signerService: SignerService, private contractService: ContractService
  ) {
    // setInterval(()=>{
    //   console.log('---', this.contractService.)
    // },5000)
  }

  private defineVoted (userAddress: string, tasks: ContractGrantRawModel): string[] {
    const result = []
    for (const key in tasks) {
      // @ts-ignore
      const grant = tasks[key]
      if (grant.voted && Object.keys(grant.voted).includes(userAddress)) {
        result.push(key)
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
    if (masterAddress === userAddress) {
      result.mainRole = RoleEnum.master
      result.roles.isMaster = true
    }
    if (DAOMemberAddress.includes(userAddress)) {
      result.mainRole = RoleEnum.DAOMember
      result.roles.isDAO = true
    }
    if (WorkGroupAddress.includes(userAddress)) {
      result.mainRole = RoleEnum.workingGroup
      result.roles.isWG = true
    }
    if (userAddress !== '') {
      result.mainRole = result.mainRole === RoleEnum.unauthorized ? RoleEnum.authorized : result.mainRole
      result.roles.isAuth = true
    }
    return result
  }
}
