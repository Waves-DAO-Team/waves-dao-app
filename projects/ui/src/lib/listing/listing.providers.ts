import { InjectionToken, Provider } from '@angular/core'
import {
  ContractGrantRawModel
} from '@services/contract/contract.model'
import { ContractService } from '@services/contract/contract.service'
import { catchError } from 'rxjs/operators'
import { translate } from '@ngneat/transloco'
import { MatSnackBar } from '@angular/material/snack-bar'
import { LoadingWrapper, LoadingWrapperModel } from '@libs/loading-wrapper/loading-wrapper'
import { ActivatedRoute } from '@angular/router'

export const GRANTS = new InjectionToken<LoadingWrapperModel<ContractGrantRawModel[]>>(
  'A stream with contracts list'
)

export const grantsFactory = (
  contractService: ContractService,
  route: ActivatedRoute,
  snackBar: MatSnackBar
): LoadingWrapperModel<ContractGrantRawModel[]> => new LoadingWrapper(
  contractService.streamTasks.pipe(
    catchError((error) => {
      if (error.status === 503) {
        snackBar.open(translate('messages.503'), translate('messages.ok'))
      } else {
        snackBar.open(error.message, translate('messages.ok'))
      }
      return []
    }))
)

export const GRANTS_PROVIDERS: Provider[] = [
  {
    provide: GRANTS,
    deps: [ContractService, ActivatedRoute, MatSnackBar],
    useFactory: grantsFactory
  }
]
