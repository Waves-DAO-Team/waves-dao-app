import { InjectionToken, Provider } from '@angular/core'
import {
  switchMap,
  publishReplay,
  refCount,
  map, tap,
} from 'rxjs/operators'
import { ActivatedRoute } from '@angular/router'
import { LoadingWrapper, LoadingWrapperModel } from '@libs/loading-wrapper/loading-wrapper'
import {
  ContractGrantModel
} from '@services/contract/contract.model'
import { ContractService } from '@services/contract/contract.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { translate } from '@ngneat/transloco'
import { ContractProviderDefine } from '@services/contract/contract-provider-factory'
import { GrantsVariationType } from '@services/static/static.model'
import { log } from '@libs/log'
import {RequestModel, RequestStatus} from '@services/request/request.model'

export const ENTITY = new InjectionToken<LoadingWrapperModel<ContractGrantModel>>(
  'A stream with current contract'
)

export const CONTRACT = new InjectionToken<GrantsVariationType>(
  'A stream with contract info'
)

export const entityFactory = (
  contactService: ContractService,
  route: ActivatedRoute,
  snackBar: MatSnackBar
): LoadingWrapperModel<ContractGrantModel | null> => new LoadingWrapper(
  route.params.pipe(
    switchMap(({ entityId }) => contactService.entityById(entityId)),
    log('EntityPageComponent::entityFactory'),
    map((data: RequestModel<ContractGrantModel>) => {
      if (data.status === RequestStatus.error) {
        if (data?.error?.status === 503) {
          snackBar.open(translate('messages.503'),
              translate('messages.ok'))
        } else {
          snackBar.open(translate(data?.error?.message || 'Unexpected error'), translate('messages.ok'))
        }
      }
      return data
    }),
    publishReplay(1),
    refCount(),
  ),
    `pages/EntityPageComponent::${ route?.snapshot?.params?.entityId as string }`
)

// По этому токену будет идти стрим с необходимой компоненту информацией:
export const ENTITY_PAGE_PROVIDERS: Provider[] = [
  {
    provide: ENTITY,
    deps: [ContractService, ActivatedRoute, MatSnackBar],
    useFactory: entityFactory
  },
  ContractProviderDefine(CONTRACT)
]
