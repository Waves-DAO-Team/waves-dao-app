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
import { FactoryProvider, InjectionToken } from '@angular/core'
import { StaticService } from '@services/static/static.service'
import { GrantsVariationType } from '@services/static/static.model'

export const contractProviderFactory = (
  staticService: StaticService,
  route: ActivatedRoute,
  router: Router,
  snackBar: MatSnackBar
): LoadingWrapperModel<GrantsVariationType> => new LoadingWrapper(
  route.params.pipe(
    filter(({ contractType }) => !!contractType),
    switchMap(({ contractType }): Observable<GrantsVariationType> => staticService.getStaticContract(contractType)),
    catchError((error) => {
      // Todo обработать ошибки
      snackBar.open(error, translate('messages.ok'))
      throw new Error(translate('messages.errors.contract_not_found'))
    }),
    publishReplay(1),
    refCount()
  )
)

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ContractProviderDefine = (tokenName: InjectionToken<GrantsVariationType>): FactoryProvider => ({
  provide: tokenName,
  deps: [StaticService, ActivatedRoute, Router, MatSnackBar],
  useFactory: contractProviderFactory
})
