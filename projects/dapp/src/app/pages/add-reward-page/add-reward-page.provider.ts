import { InjectionToken, Provider } from '@angular/core'
import {
  LoadingWrapperModel
} from '@libs/loading-wrapper/loading-wrapper'
import {
  GrantsVariationType
} from '@services/contract/contract.model'
import { ContractProviderDefine } from '@services/contract/contract-provider-factory'
import { CurrencyPipe } from '@angular/common'

export const CONTRACT = new InjectionToken<LoadingWrapperModel<GrantsVariationType>>(
  'A stream with contract'
)

// По этому токену будет идти стрим с необходимой компоненту информацией:
export const ADD_REWARD_PAGE_PROVIDERS: Provider[] = [
  ContractProviderDefine(CONTRACT), CurrencyPipe
]
