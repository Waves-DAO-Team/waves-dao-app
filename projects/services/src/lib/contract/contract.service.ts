import { Inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import {
  map,
  publishReplay,
  refCount,
  repeatWhen,
  switchMap, takeUntil,
  tap
} from 'rxjs/operators'
import { API, AppApiInterface } from '@constants'
import { BehaviorSubject, Observable, Subject } from 'rxjs'
import {
  ContractDataModel, ContractGrantModel,
  ContractRawData,
  ContractRawDataEntityId,
  ContractRawDataNumber,
  ContractRawDataString
} from './contract.model'
import {SignerUser} from "@services/signer/signer.model";

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private apiGetAddressData = new URL('/addresses/data/' + this.api.contractAddress, this.api.rest)
  private contractRefresh$: Subject<null> = new Subject()

  // @ts-ignore
  private contractState$: BehaviorSubject<ContractDataModel> = new BehaviorSubject(
    {})

  private readonly contractState = this.http.get<Observable<ContractRawData>>(this.apiGetAddressData.href, {
    headers: {
      accept: 'application/json; charset=utf-8'
    }
  }).pipe(
    // @ts-ignore
    repeatWhen(() => this.contractRefresh$),
    map((data: ContractRawData) => {
      return this.prepareData(data)
    }),
    switchMap((data: ContractDataModel) => {
      this.contractState$.next(data)
      return this.contractState$.pipe(takeUntil(this.contractRefresh$))
    }),
    tap((data) => {
      console.log('Origin contract data :: projects/services/src/lib/contract/contract.service.ts: 47\n\n', data)
    }),
    publishReplay(1),
    refCount()
  )

  public readonly stream: Observable<ContractDataModel> = this.contractState.pipe(
    publishReplay(1),
    refCount()
  )

  public readonly streamTasks: Observable<ContractGrantModel[]> = this.contractState.pipe(map((contract) => {
    return Object.keys(contract?.tasks).map((entityKey: string) => {
      return {
        ...contract?.tasks[entityKey],
        id: entityKey
      }
    })
  }))

  public readonly streamDAO = this.contractState.pipe(map((contract) => {
    return Object.values(contract?.dao)
  }))

  public readonly streamWorkGroup = this.contractState.pipe(map((contract) => {
    return Object.values(contract?.working)
  }))

  constructor (
      private readonly http: HttpClient,
      @Inject(API) private readonly api: AppApiInterface
  ) {}

  refresh () {
    this.contractRefresh$.next(null)
  }

  private group (keys: string[], context: {[s: string]: object}, value: ContractRawDataString|ContractRawDataNumber): void {
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
    return this.stream.pipe(map((data) => {
      return data?.tasks[entityId]
    }))
  }
}
