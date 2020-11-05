import { InjectionToken, Provider } from '@angular/core'
import { switchMap, tap, publishReplay, refCount, catchError } from 'rxjs/operators'
import { ActivatedRoute } from '@angular/router'
import { LoadingWrapper, LoadingWrapperModel } from '@libs/loading-wrapper/loading-wrapper'
import { ContractGrantModel } from '@services/contract/contract.model'
import { ContractService } from '@services/contract/contract.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { translate } from '@ngneat/transloco'

export const ENTITY = new InjectionToken<LoadingWrapperModel<ContractGrantModel>>(
  'A stream with current contract'
)

// По этому токену будет идти стрим с необходимой компоненту информацией:
export const ENTITY_PAGE_PROVIDERS: Provider[] = [
  {
    provide: ENTITY,
    deps: [ContractService, ActivatedRoute, MatSnackBar],
    useFactory: EntityFactory
  }
]

export function EntityFactory (
  contactService: ContractService,
  route: ActivatedRoute,
  snackBar: MatSnackBar
): LoadingWrapperModel<ContractGrantModel> {
  return new LoadingWrapper(
    route.params.pipe(
      switchMap(({ entityId }) => {
        return contactService.entityById(entityId)
      }),
      catchError((error) => {
        // Todo обработать ошибки
        snackBar.open(error, translate('messages.ok'))
        throw new Error('Entity not found')
      }),
      publishReplay(1),
      refCount()
    )
  )
}
