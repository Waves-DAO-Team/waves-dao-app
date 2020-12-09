import { ContractService } from '@services/contract/contract.service'
import { translate, TranslocoService } from '@ngneat/transloco'
import { ActivatedRoute, Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar'
import {
  LoadingWrapper,
  LoadingWrapperModel
} from '@libs/loading-wrapper/loading-wrapper'
import { GrantsVariationType, GrantTypesEnum } from '@services/contract/contract.model'
import {
  catchError,
  map,
  publishReplay,
  refCount,
  switchMap,
  take,
  tap
} from 'rxjs/operators'
import { combineLatest, Observable } from 'rxjs'
import { InjectionToken } from '@angular/core'
import { UserService } from '@services/user/user.service'
import { RolesInterface } from '@services/user/user.interface'

export function ContractProviderDefine (tokenName: InjectionToken<GrantsVariationType>) {
  return {
    provide: tokenName,
    deps: [ContractService, UserService, ActivatedRoute, Router, MatSnackBar],
    useFactory: ContractProviderFactory
  }
}

export function ContractProviderFactory (
  contractService: ContractService,
  userService: UserService,
  route: ActivatedRoute,
  router: Router,
  snackBar: MatSnackBar
): LoadingWrapperModel<GrantsVariationType> {
  const checkPermissionSettings = (contractType: string, roles: RolesInterface): boolean => {
    return roles.isMaster
  }

  const checkPermissionCreateGrant = (contractType: string, roles: RolesInterface): boolean => {
    return contractType === GrantTypesEnum.web3 ? roles.isAuth : roles.isWG
  }

  const checkPermissionFinishCreateGrant = (contractType: string, roles: RolesInterface): boolean => {
    return contractType === GrantTypesEnum.web3 ? roles.isAuth : roles.isWG
  }

  const checkPermissionVoted = (contractType: string, roles: RolesInterface): boolean => {
    return roles.isDAO
  }

  return new LoadingWrapper(
    route.params.pipe(
      switchMap(({ contractType }): Observable<GrantsVariationType> => {
        contractService.switchContract(contractType)

        return combineLatest([
          contractService.getContactInfo(contractType),
          userService.data
        ]).pipe(
          map(([contractInfo, user]) => {
            if (!contractInfo) {
              throw new Error('Contact is not found')
            }

            return {
              ...contractInfo,
              permissionCreateGrant: checkPermissionCreateGrant(contractInfo.name, user.roles),
              permissionFinishCreateGrant: checkPermissionFinishCreateGrant(contractInfo.name, user.roles),
              permissionVote: checkPermissionVoted(contractInfo.name, user.roles),
              permissionSettings: checkPermissionSettings(contractInfo.name, user.roles)
            }
          })
        )
      }),
      catchError((error) => {
        // Todo обработать ошибки
        snackBar.open(error, translate('messages.ok'))
        throw new Error('Contract not found')
      }),
      publishReplay(1),
      refCount()
    )
  )
}
