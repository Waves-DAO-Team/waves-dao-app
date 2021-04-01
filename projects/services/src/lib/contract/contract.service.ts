import {Inject, Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {
  distinctUntilChanged,
  filter,
  map,
  mergeMap,
  publishReplay,
  refCount, tap,
} from 'rxjs/operators'
import {API, AppApiInterface, ContractApiInterface} from '@constants';
import {BehaviorSubject, Observable } from 'rxjs'
import {
  ContractDataRawModel, ContractGrantAppModel,
  ContractGrantModel,
  ContractGrantRawModel,
  ContractGroupContext,
  ContractMembershipDataModel,
  ContractRawData,
  ContractRawDataEntityId,
  ContractRawDataString,
} from './contract.model'
import {StorageService} from '@services/storage/storage.service'
import {TranslocoService} from '@ngneat/transloco'
import {GrantStatusEnum} from '@services/static/static.model'
import {MembershipService} from '@services/membership/membership.service'
import {RequestService} from '@services/request/request.service'
import {log} from '@libs/log/log.rxjs-operator'
import {RequestModel, RequestStatus} from '@services/request/request.model'

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private readonly contractAddress$: BehaviorSubject<ContractApiInterface> =
  new BehaviorSubject(this.api.contracts.web3)

  private readonly contractState = this.contractAddress$.pipe(
    log('%c ContractService::contractState', 'color:yellow'),
    mergeMap((address: ContractApiInterface) => this.getContractData(address.address)),
    publishReplay(1),
    refCount(),
    log('%c ContractService::contractState -> getContractData', 'color:yellow'),
  )

  public entityId$: BehaviorSubject<string> = new BehaviorSubject<string>('')

  public readonly membershipStream: Observable<RequestModel<ContractMembershipDataModel>> =
      this.membershipService.stream.pipe(
          log('%c ContractService::membershipStream', 'color:yellow'),
          tap(),
          publishReplay(1),
          refCount()
      )

  public readonly stream: Observable<RequestModel<ContractDataRawModel>> = this.contractState.pipe(
    publishReplay(1),
    refCount(),
    distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
    log('%c ContractService::stream', 'color:yellow'),
  )

  public readonly streamTasks: Observable<RequestModel<ContractGrantModel[]>> = this.stream.pipe(
      map((contract: RequestModel<ContractDataRawModel>) => ({
          ...contract,
          payload: (contract?.payload?.tasks ?
              Object.keys(contract?.payload?.tasks || {}).map((entityKey: string) => ({
                ...(contract?.payload?.tasks ? contract?.payload?.tasks[entityKey] : {}),
                id: entityKey
              })) : []) as ContractGrantModel[]
        })),
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b) ),
      publishReplay(1),
      refCount(),
      log('%c ContractService::streamTasks', 'color:yellow'),
  )

  public entityById (entityId: ContractRawDataEntityId): Observable<RequestModel<ContractGrantModel>> {
    this.entityId$.next(entityId)

    return this.stream.pipe(
      filter((data) => !!data?.payload?.tasks),
      log('%c ContractService::entityById::input', 'color:yellow'),
      map((data: RequestModel<ContractDataRawModel>): RequestModel<ContractGrantModel> => {
        if (!data?.payload?.tasks) {
          return {
            status: RequestStatus.error,
            error: {
              status: 404,
              message: 'Entity is not exist in contract'
            },
            payload: {}
          }
        }

        const grant: ContractGrantRawModel | null = data?.payload?.tasks ? data?.payload?.tasks[entityId] : null

        if (!grant) {
          return {
            status: RequestStatus.error,
            error: {
              status: 404,
              message: 'Entity not fount'
            },
            payload: {}
          }
        }

        return {
          status: data.status,
          error: data.error,
          payload: {
            ...grant,
            isShowAppliers: ![
              '',
              GrantStatusEnum.noStatus.toString(),
              GrantStatusEnum.proposed.toString()
            ].includes(grant?.status?.value || ''),
            app: (grant?.app ? Object.keys(grant.app).map((appKey: string) => ({
              ...(grant?.app ? grant?.app?.[appKey] : null),
              key: appKey
            })) : []) as ContractGrantAppModel[],
            id: entityId
          }
        }
      }),
      log('%c ContractService::entityById::output', 'color:yellow')
    )
  }

  public getContract (): ContractApiInterface {
    return this.contractAddress$.getValue()
  }

  public getAddress (): string {
    return this.contractAddress$.getValue().address
  }

  public getRewardAsset (): string | null {
    return this.contractAddress$.getValue().rewardAsset
  }

  public getRewardAssetIcon (): string | null {
    return this.contractAddress$.getValue().rewardAssetIcon
  }

  public applicants: string[] = []

  constructor (
    private readonly http: HttpClient,
    private storageService: StorageService,
    private readonly translocoService: TranslocoService,
    private readonly membershipService: MembershipService,
    @Inject(API) private readonly api: AppApiInterface,
    private readonly requestService: RequestService,
  ) {
  }

  public getContractData (address: string): Observable<RequestModel<ContractDataRawModel>> {
    return this.requestService.getContract(address).pipe(
      map((data: RequestModel<ContractRawData>): RequestModel<ContractDataRawModel> => ({
        status: data.status,
        error: data.error,
        payload: {
          ...this.prepareData(data.payload),
          address
        }
      })),
      log('%c ContractService::getContractData', 'color:yellow')
    )
  }

  public refresh (address: ContractApiInterface = this.getContract(), force = true): void {
    // this.storageService.contractAddress = address
    this.contractAddress$.next(address)
    // return this.contractState.pipe(skip(1), take(1))

    if (force) {
      this.requestService.refresh(address.address)
    }
  }

  public switchContract (type: string | undefined): void {
    if (!type) {
      return
    }

    const contracts = this.api.contracts as { [s: string]: ContractApiInterface }

    if (!contracts[type]) {
      throw new Error('ContractService::switchContract | Contract ' + type + ' is not found ')
    }

    if (this.contractAddress$.getValue().address !== contracts[type].address) {
      this.refresh(contracts[type])
    }
  }

  private group (
    keys: string[],
    context: ContractGroupContext,
    value: ContractRawDataString
  ): undefined {
    const key: string | undefined = keys.shift()
    if (!key) {
      return undefined
    }

    if (!context[key]) {
      context[key] = keys.length === 0 ? value : {}
    }
    return this.group(keys, context[key] as ContractGroupContext, value)
  }

  private prepareData (data: ContractRawData | null): ContractRawData | null {
    if (!data) {
      return null
    }

    // Todo rewrite this recursive functions
    // @ts-ignore: Complex case
    return data.reduce((orig: ContractGroupContext, item: ContractRawDataString) => {
      const keys = item.key.split('_')
      this.group(keys, orig, item)
      return orig
    }, {})
  }
}
