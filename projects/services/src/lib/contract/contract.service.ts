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
  ContractDataModel,
  ContractRawData,
  ContractRawDataNumber,
  ContractRawDataString
} from './contract.model'

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private apiGetAddressData = new URL('/addresses/data/' + this.api.contractAddress, this.api.rest)

  private contractRefresh$: Subject<null> = new Subject()

  // @ts-ignore
  private contractState$: BehaviorSubject<ContractDataModel> = new BehaviorSubject(
    {})

  private contractState = this.http.get<Observable<ContractRawData>>(this.apiGetAddressData.href, {
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
      console.log('DATA', data)
    }),
    publishReplay(1),
    refCount()
  )

  constructor (
      private readonly http: HttpClient,
      @Inject(API) private readonly api: AppApiInterface
  ) {}

  get stream () {
    return this.contractState
  }

  refresh () {
    this.contractRefresh$.next(null)
  }

  private group (keys: string[], context: {[s: string]: object}, value: ContractRawDataString|ContractRawDataNumber): void {
    // @ts-ignore
    const key: string = keys.shift()

    if (!key) {
      return
    }

    if (!context[key]) {
      context[key] = keys.length === 0 ? value : {}
    }

    // @ts-ignore
    return this.group(keys, context[key], value)
  }

  private prepareData (data: ContractRawData): ContractDataModel {
    // @ts-ignore
    return data.reduce((orig, item) => {
      const keys = item.key.split('_')
      this.group(keys, orig, item)
      return orig
    }, {})
  }
}
