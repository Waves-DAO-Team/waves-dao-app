import { InjectionToken, Provider } from '@angular/core'
import {
  LoadingWrapper,
  LoadingWrapperModel
} from '@libs/loading-wrapper/loading-wrapper'
import {
  ContractGrantModel,
  GrantsVariationType
} from '@services/contract/contract.model'
import { ContractService } from '@services/contract/contract.service'
import { translate, TranslocoService } from '@ngneat/transloco'
import { ActivatedRoute, Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar'
import { ContractProviderFactory } from '@services/contract/contract-provider-factory'

export const CONTRACT = new InjectionToken<LoadingWrapperModel<ContractGrantModel>>(
  'A stream with contract for a listiong'
)

// По этому токену будет идти стрим с необходимой компоненту информацией:
export const ABOUT_PAGE_PROVIDERS: Provider[] = [
  {
    provide: CONTRACT,
    deps: [ContractService, TranslocoService, ActivatedRoute, Router, MatSnackBar],
    useFactory: ContractProviderFactory
  }
]
