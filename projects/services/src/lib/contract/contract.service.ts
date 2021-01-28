import { Inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import {
  map,
  publishReplay,
  refCount,
  skip,
  switchMap, take, tap
} from 'rxjs/operators'
import { API, AppApiInterface } from '@constants'
import { BehaviorSubject, combineLatest, Observable } from 'rxjs'
import {
  ContractDataModel, ContractGrantModel,
  ContractGrantRawModel,
  ContractRawData,
  ContractRawDataEntityId,
  ContractRawDataNumber,
  ContractRawDataString
} from './contract.model'
import { StorageService } from '@services/storage/storage.service'
import { TranslocoService } from '@ngneat/transloco'
import { grantStatusEnum } from '@services/static/static.model'
import { MembershipService } from '@services/membership/membership.service'

type EmptyObject = {
  [K in string]: never
}

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  public applicants: string[] = []
  private readonly contractAddress$: BehaviorSubject<string> =
    new BehaviorSubject(this.storageService.contactAddress || this.api.contracts.web3)

  private readonly contractState = this.contractAddress$.pipe(
    switchMap((address) => this.getContractData(address)),
    publishReplay(1),
    refCount()
  )

  public readonly stream: Observable<ContractDataModel> = combineLatest([this.contractState, this.membershipService.stream]).pipe(
    map(([data, members]) => ({
      ...data,
      ...members
    })),
    tap((data) => {
      console.log('CONTRACT DATA', data)
    }),
    publishReplay(1),
    refCount()
  )

  public readonly streamTasks: Observable<ContractGrantRawModel[]> = this.contractState.pipe(map((contract) =>
    Object.keys(contract?.tasks || {}).map((entityKey: string) => ({
    ...contract?.tasks[entityKey],
    id: entityKey
  }))))

  constructor (
    private readonly http: HttpClient,
    private storageService: StorageService,
    private readonly translocoService: TranslocoService,
    private readonly membershipService: MembershipService,
    @Inject(API) private readonly api: AppApiInterface
  ) {}

  public getContractData (address: string) {
    const url = new URL('/addresses/data/' + address, this.api.rest)
    return this.http.get<Observable<ContractRawData>>(url.href, {
      headers: { accept: 'application/json; charset=utf-8' }
    }).pipe(
      // Todo поправить типизацию, пришлось лезть в контракт и переделывать структуру данных
// @ts-ignore
      map((data: ContractRawData) => ({
        ...this.prepareData(data),
        address
      }))
    )
  }

  public refresh (address: string = this.getAddress()): Observable<ContractDataModel> {
    this.storageService.contactAddress = address
    this.contractAddress$.next(address)

    return this.contractState.pipe(skip(1), take(1))
  }

  public switchContract (type: string | undefined) {
    if (!type) {
      return
    }

    const contracts = this.api.contracts as { [s: string]: string }

    if (!contracts[type]) {
      throw new Error('ContractService::switchContract | Contract ' + type + ' is not found ')
    }
    this.refresh(contracts[type])
  }

  private group (
    keys: string[],
    context: { [s: string]: EmptyObject },
    value: ContractRawDataString | ContractRawDataNumber
  ):
    void {
    // Todo поправить типизацию, пришлось лезть в контракт и переделывать структуру данных
// @ts-ignore
    const key: string = keys.shift()
    if (!key) {
      return
    }

    if (!context[key]) {
      context[key] = keys.length === 0 ? value : {}
    }

    // Todo поправить типизацию, пришлось лезть в контракт и переделывать структуру данных
// @ts-ignore
    return this.group(keys, context[key], value)
  }

  private prepareData (data: ContractRawData): ContractDataModel {
    // Todo поправить типизацию, пришлось лезть в контракт и переделывать структуру данных
// @ts-ignore
    return data.reduce((orig, item) => {
      const keys = item.key.split('_')
      this.group(keys, orig, item)
      return orig
    }, {})
  }

  public entityById (entityId: ContractRawDataEntityId): Observable<ContractGrantModel> {
    return this.stream.pipe(
      map((data: ContractDataModel) => {
        const grant: ContractGrantRawModel = data.tasks[entityId]

        return {
          ...grant,
          isShowAppliers: !['', grantStatusEnum.noStatus.toString(), grantStatusEnum.proposed.toString()].includes(grant?.status?.value || ''),
          app: grant.app ? Object.keys(grant.app).map((appKey) => ({
            ...grant?.app?.[appKey],
            key: appKey
          })) : [],
          id: entityId
        } as ContractGrantModel
      })
    )
  }

  public getAddress (): string {
    return this.contractAddress$.getValue()
  }
}
