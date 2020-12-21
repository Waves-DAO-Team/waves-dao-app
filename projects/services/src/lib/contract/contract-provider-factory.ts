import { translate } from '@ngneat/transloco'
import { ActivatedRoute, Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar'
import {
  LoadingWrapper,
  LoadingWrapperModel
} from '@libs/loading-wrapper/loading-wrapper'
import {
  catchError,
  filter,
  publishReplay,
  refCount,
  switchMap
} from 'rxjs/operators'
import { Observable } from 'rxjs'
import { InjectionToken } from '@angular/core'
import { StaticService } from '@services/static/static.service'
import { GrantsVariationType } from '@services/static/static.model'

export function ContractProviderDefine (tokenName: InjectionToken<GrantsVariationType>) {
  return {
    provide: tokenName,
    deps: [StaticService, ActivatedRoute, Router, MatSnackBar],
    useFactory: ContractProviderFactory
  }
}

export function ContractProviderFactory (
  staticService: StaticService,
  route: ActivatedRoute,
  router: Router,
  snackBar: MatSnackBar
): LoadingWrapperModel<GrantsVariationType> {
  return new LoadingWrapper(
    route.params.pipe(
      filter(({ contractType }) => !!contractType),
      switchMap(({ contractType }): Observable<GrantsVariationType> => {
        return staticService.getStaticContract(contractType)
      }),
      catchError((error) => {
        // Todo обработать ошибки
        snackBar.open(error, translate('messages.ok'))
        console.log('Error', error)
        throw new Error('Contract not found')
      }),
      publishReplay(1),
      refCount()
    )
  )
}
