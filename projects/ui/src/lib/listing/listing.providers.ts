import { InjectionToken, Provider } from '@angular/core'
import {
  ContractGrantModel,
} from '@services/contract/contract.model'
import { ContractService } from '@services/contract/contract.service'
import {map, publishReplay, refCount, tap} from 'rxjs/operators'
import { translate } from '@ngneat/transloco'
import { MatSnackBar } from '@angular/material/snack-bar'
import {
  LoadingWrapper,
  LoadingWrapperModel,
} from '@libs/loading-wrapper/loading-wrapper'
import {RequestModel, RequestStatus} from '@services/request/request.model'

export const GRANTS = new InjectionToken<LoadingWrapperModel<ContractGrantModel[]>>(
  'A stream with contracts list'
)

export const grantsFactory = (
  contractService: ContractService,
  snackBar: MatSnackBar
): LoadingWrapperModel<ContractGrantModel[]> => new LoadingWrapper(
      contractService.streamTasks.pipe(
        map((data: RequestModel<ContractGrantModel[]>): RequestModel<ContractGrantModel[]>  => {
          if (data.status === RequestStatus.error) {
            if (data?.error?.status === 503) {
              snackBar.open(translate('messages.503'),
                  translate('messages.ok'))
            } else {
              snackBar.open(data?.error?.message || 'Unexpected error', translate('messages.ok'))
            }
          }

          return {
            status: data.status,
            error: data.error,
            payload: data.payload,
          }
        }),
        publishReplay(1),
        refCount()
      ),
      'ui/ListingComponent::' + contractService.getAddress()
  )

export const GRANTS_PROVIDERS: Provider[] = [
  {
    provide: GRANTS,
    deps: [ContractService, MatSnackBar],
    useFactory: grantsFactory
  }
]
