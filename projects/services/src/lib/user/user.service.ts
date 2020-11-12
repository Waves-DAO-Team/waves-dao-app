import {Injectable} from '@angular/core'
import { RoleEnum, UserDataInterface} from '@services/user/user.interface'
import {SignerService} from '@services/signer/signer.service'
import {ContractService} from '@services/contract/contract.service'
import {environment} from '../../../../dapp/src/environments/environment'
import {BehaviorSubject, combineLatest, Observable, ObservedValueOf} from 'rxjs'
import {translate} from '@ngneat/transloco'
import {MatSnackBar} from '@angular/material/snack-bar'
import {defaultIfEmpty, map, publishReplay, refCount, switchMap, tap} from "rxjs/operators";
import {ContractDataModel} from "@services/contract/contract.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public data: BehaviorSubject<UserDataInterface> = new BehaviorSubject<UserDataInterface>({
    userRole: RoleEnum.unauthorized,
    userAddress: '',
    DAOMemberAddress: [],
    WorkGroupAddress: [],
    masterAddress: ''
  })

  private readonly data$ = combineLatest([this.signerService.user, this.contractService.stream])
    .pipe(
      tap(([userAddress, contract]) =>{
        const masterAddress = environment.apis.contractAddress
        const WorkGroupAddress = Object.keys(contract.working.group.member)
        const DAOMemberAddress = Object.keys(contract.dao.member)
        const userRole = this.defineRol(masterAddress, userAddress.address, DAOMemberAddress, WorkGroupAddress)
        this.data.next({
          DAOMemberAddress,
          WorkGroupAddress,
          masterAddress,
          userAddress: userAddress.address,
          userRole
        })
      }),
      publishReplay(1),
      refCount()
    )

  constructor(
    private signerService: SignerService, private contractService: ContractService, private snackBar: MatSnackBar
  ) {
    this.data$.subscribe()
  }

  public signup(): void {
    this.signerService.login().subscribe(() => {
    }, (error) => {
      this.snackBar.open(error, translate('messages.ok'))
    })
  }

  private defineRol(masterAddress: string, userAddress: string, DAOMemberAddress: string[], WorkGroupAddress: string[]): RoleEnum {
    if (masterAddress === userAddress) {
      return RoleEnum.master
    } else if (userAddress != '') {
      return RoleEnum.authorized
    } else if (DAOMemberAddress.includes(userAddress)) {
      return RoleEnum.DAOMember
    } else if (WorkGroupAddress.includes(userAddress)) {
      return RoleEnum.workingGroup
    } else {
      return RoleEnum.unauthorized
    }
  }

}
