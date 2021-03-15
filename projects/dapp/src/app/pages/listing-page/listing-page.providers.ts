import { InjectionToken, Provider } from '@angular/core'
import {
  LoadingWrapperModel
} from '@libs/loading-wrapper/loading-wrapper'
import { ContractProviderDefine } from '@services/contract/contract-provider-factory'
import {RequestModel} from '@services/request/request.model'
import {GrantsVariationType} from '@services/static/static.model'

export const CONTRACT = new InjectionToken<LoadingWrapperModel<RequestModel<GrantsVariationType>>>(
  'A stream with contract for a listiong'
)

// По этому токену будет идти стрим с необходимой компоненту информацией:
export const LISTING_PAGE_PROVIDERS: Provider[] = [
  ContractProviderDefine(CONTRACT)
]
