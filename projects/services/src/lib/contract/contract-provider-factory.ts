import {ActivatedRoute} from '@angular/router'
import {
  LoadingWrapper,
  LoadingWrapperModel,
} from '@libs/loading-wrapper/loading-wrapper'
import {filter, map, publishReplay, refCount, switchMap} from 'rxjs/operators'
import {FactoryProvider, InjectionToken} from '@angular/core'
import {StaticService} from '@services/static/static.service'
import {
  GrantsVariationType,
} from '@services/static/static.model'
import {
  RequestModel,
  RequestStatus,
} from '@services/request/request.model'


export const contractProviderFactory = (
  staticService: StaticService,
  route: ActivatedRoute
): LoadingWrapperModel<GrantsVariationType> =>
   new LoadingWrapper(
      route.params.pipe(
          filter(({ contractType }) => !!contractType),
          switchMap(({ contractType }) => staticService.getStaticContract(contractType)),
          map((data: GrantsVariationType): RequestModel<GrantsVariationType> => ({
              status: RequestStatus.complete,
              error: null,
              payload: data
            })),
          publishReplay(1),
          refCount()
      ),
      `pages/ListingPageComponent::${ route?.snapshot?.params?.contractType as string }`
  )

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ContractProviderDefine = (tokenName: InjectionToken<RequestModel<GrantsVariationType>>): FactoryProvider => ({
  provide: tokenName,
  deps: [StaticService, ActivatedRoute],
  useFactory: contractProviderFactory
})
