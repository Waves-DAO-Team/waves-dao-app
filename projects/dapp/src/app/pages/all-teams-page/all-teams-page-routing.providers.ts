import { InjectionToken, Provider } from '@angular/core'
import {switchMap, publishReplay, refCount, catchError, tap} from 'rxjs/operators'
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

export const ALL_TEAM = new InjectionToken<LoadingWrapperModel<ContractGrantModel>>(
  'A stream with current contract'
)

export const ALL_TEAM_CONTRACT = new InjectionToken<GrantsVariationType>(
  'A stream with contract info'
)

export const allTeamFactory = (
  contactService: ContractService,
  route: ActivatedRoute,
  snackBar: MatSnackBar
): LoadingWrapperModel<ContractGrantModel> => new LoadingWrapper(
  route.params.pipe(
    switchMap(({ entityId }) => contactService.entityById(entityId)),
    catchError((error) => {
      // Todo обработать ошибки (404)
      snackBar.open(error, translate('messages.ok'))
      throw new Error('Entity not found')
    }),
    publishReplay(1),
    refCount()
  )
)

// По этому токену будет идти стрим с необходимой компоненту информацией:
export const ALL_TEAM_PAGE_PROVIDERS: Provider[] = [
  {
    provide: ALL_TEAM,
    deps: [ContractService, ActivatedRoute, MatSnackBar],
    useFactory: allTeamFactory
  },
  ContractProviderDefine(ALL_TEAM_CONTRACT)
]
