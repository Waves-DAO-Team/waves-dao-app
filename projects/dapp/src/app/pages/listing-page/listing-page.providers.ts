import { InjectionToken, Provider } from '@angular/core'
import {
  LoadingWrapperModel
} from '@libs/loading-wrapper/loading-wrapper'
import { ContractGrantModel } from '@services/contract/contract.model'
import { ContractProviderDefine } from '@services/contract/contract-provider-factory'

export const CONTRACT = new InjectionToken<LoadingWrapperModel<ContractGrantModel>>(
  'A stream with contract for a listiong'
)

// По этому токену будет идти стрим с необходимой компоненту информацией:
export const LISTING_PAGE_PROVIDERS: Provider[] = [
  ContractProviderDefine(CONTRACT)
]
