import { InjectionToken, Provider } from '@angular/core'
import { contractProviderDefine } from '@services/contract/contract-provider-factory'
import { GrantsVariationType } from '@services/static/static.model'

export const CONTRACT = new InjectionToken<GrantsVariationType>(
  'A stream with contract for a about page'
)

// По этому токену будет идти стрим с необходимой компоненту информацией:
export const ABOUT_PAGE_PROVIDERS: Provider[] = [
  contractProviderDefine(CONTRACT)
]
