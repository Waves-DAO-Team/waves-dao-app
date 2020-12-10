import { InjectionToken, Provider } from '@angular/core'
import { ContractProviderDefine } from '@services/contract/contract-provider-factory'
import { CurrencyPipe } from '@angular/common'
import { GrantsVariationType } from '@services/static/static.model'

export const CONTRACT = new InjectionToken<GrantsVariationType>(
  'A stream with contract for a about page'
)

// По этому токену будет идти стрим с необходимой компоненту информацией:
export const CREATE_GRANT_PAGE_PROVIDERS: Provider[] = [
  ContractProviderDefine(CONTRACT), CurrencyPipe
]
