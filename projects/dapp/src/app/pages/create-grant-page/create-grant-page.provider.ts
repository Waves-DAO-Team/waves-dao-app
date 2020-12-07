import { InjectionToken, Provider } from '@angular/core'
import {
  GrantsVariationType
} from '@services/contract/contract.model'
import { ContractProviderDefine } from '@services/contract/contract-provider-factory'
import { CurrencyPipe } from '@angular/common'

export const CONTRACT = new InjectionToken<GrantsVariationType>(
  'A stream with contract for a about page'
)

// По этому токену будет идти стрим с необходимой компоненту информацией:
export const CREATE_GRANT_PAGE_PROVIDERS: Provider[] = [
  ContractProviderDefine(CONTRACT), CurrencyPipe
]
