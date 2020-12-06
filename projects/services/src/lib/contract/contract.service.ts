import { Inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import {
  map,
  publishReplay,
  refCount,
  switchMap, take, withLatestFrom
} from 'rxjs/operators'
import { API, AppApiInterface } from '@constants'
import { BehaviorSubject, Observable } from 'rxjs'
import {
  ContractDataModel, ContractGrantModel,
  ContractGrantRawModel,
  ContractRawData,
  ContractRawDataEntityId,
  ContractRawDataNumber,
  ContractRawDataString,
  GrantsVariationType
} from './contract.model'
import { StorageService } from '@services/storage/storage.service'
import { TranslocoService } from '@ngneat/transloco'

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private contractAddress$: BehaviorSubject<string> = new BehaviorSubject(this.storageService.contactAddress || this.api.contractAddress)
  public applicants: string[] = []
  // @ts-ignore
  private contractState$: BehaviorSubject<ContractDataModel> = new BehaviorSubject({})

  private readonly contractState = this.contractAddress$.pipe(
    // @ts-ignore
    switchMap((address) => {
      const url = new URL('/addresses/data/' + address, this.api.rest)
      return this.http.get<Observable<ContractRawData>>(url.href, {
        headers: { accept: 'application/json; charset=utf-8' }
      })
    }),
    map((data: ContractRawData) => {
      return this.prepareData(data)
    }),
    switchMap((data: ContractDataModel) => {
      this.contractState$.next(data)
      return this.contractState$.pipe(take(1))
    }),
    publishReplay(1),
    refCount()
  )

  public readonly stream: Observable<ContractDataModel> = this.contractState.pipe(
    withLatestFrom(this.contractAddress$),
    map(([data, address]) => {
      return {
        ...data,
        // Pass current contract address in data stream
        address
      }
    }),
    publishReplay(1),
    refCount()
  )

  public readonly streamTasks: Observable<ContractGrantRawModel[]> = this.contractState.pipe(map((contract) => {
    return Object.keys(contract?.tasks || {}).map((entityKey: string) => {
      return {
        ...contract?.tasks[entityKey],
        id: entityKey
      }
    })
  }))

  constructor (
    private readonly http: HttpClient,
    private storageService: StorageService,
    private translocoService: TranslocoService,
    @Inject(API) private readonly api: AppApiInterface
  ) {}

  public refresh (address: string = this.getAddress()) {
    this.storageService.contactAddress = address
    this.contractAddress$.next(address)
  }

  public switchContract (address: string) {
    this.refresh(address)
  }

  doRefreshTimeOut () {
    this.refresh()
    setTimeout(() => {
      this.refresh()
    }, 1000)
    setTimeout(() => {
      this.refresh()
    }, 5000)
    setTimeout(() => {
      this.refresh()
    }, 10000)
  }

  private group (keys: string[], context: { [s: string]: object }, value: ContractRawDataString | ContractRawDataNumber): void {
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
          app: grant.app ? Object.keys(grant.app).map((appKey) => {
            return {
              ...grant?.app?.[appKey],
              key: appKey
            }
          }) : [],
          id: entityId
        } as ContractGrantModel
      })
    )
  }

  public getAddress (): string {
    return this.contractAddress$.getValue()
  }

  public getContactsList (): Observable<GrantsVariationType[]> {
    const contracts = this.api.contracts as { [s: string]: string }

    return this.translocoService.selectTranslateObject('contracts').pipe(
      map((data: {[s: string]: GrantsVariationType}) => {
        return Object.keys(data).map((key) => {
          return {
            ...data[key],
            name: key,
            type: contracts[key] || null
          } as GrantsVariationType
        })
      }),
      publishReplay(1),
      refCount()
    )
  }

  getContactInfo (contactType: string): Observable<GrantsVariationType | null> {
    return this.getContactsList().pipe(
      map((contracts: GrantsVariationType[]) => {
        console.log('>>>', contracts)
        return contracts.find((item) => item.name === contactType) || null
      })
    )
  }
}
