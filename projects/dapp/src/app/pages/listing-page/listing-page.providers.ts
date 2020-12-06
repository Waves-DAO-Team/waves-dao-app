import { InjectionToken, Provider } from '@angular/core'
import {
  LoadingWrapper,
  LoadingWrapperModel
} from '@libs/loading-wrapper/loading-wrapper'
import { ContractGrantModel, GrantsVariationType } from '@services/contract/contract.model'
import { ContractService } from '@services/contract/contract.service'
import { ActivatedRoute, Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar'
import {
  catchError,
  map,
  publishReplay,
  refCount,
  switchMap,
  tap
} from 'rxjs/operators'
import { translate, TranslocoService } from '@ngneat/transloco'
import { Observable } from 'rxjs'
import { ContractProviderFactory } from '@services/contract/contract-provider-factory'

export const CONTRACT = new InjectionToken<LoadingWrapperModel<ContractGrantModel>>(
  'A stream with contract for a listiong'
)

// По этому токену будет идти стрим с необходимой компоненту информацией:
export const LISTING_PAGE_PROVIDERS: Provider[] = [
  {
    provide: CONTRACT,
    deps: [ContractService, TranslocoService, ActivatedRoute, Router, MatSnackBar],
    useFactory: ContractProviderFactory
  }
]
