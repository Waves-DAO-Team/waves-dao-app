import { InjectionToken, Provider } from '@angular/core'
import {
  LoadingWrapperModel
} from '@libs/loading-wrapper/loading-wrapper'
import { ContractProviderDefine } from '@services/contract/contract-provider-factory'
import { CurrencyPipe } from '@angular/common'
import { GrantsVariationType } from '@services/static/static.model'

export const CONTRACT = new InjectionToken<LoadingWrapperModel<GrantsVariationType>>(
  'A stream with contract'
)

// По этому токену будет идти стрим с необходимой компоненту информацией:
export const ADD_REWARD_PAGE_PROVIDERS: Provider[] = [
  ContractProviderDefine(CONTRACT), CurrencyPipe
]
