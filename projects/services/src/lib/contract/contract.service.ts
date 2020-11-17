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
import { BehaviorSubject, from, Observable, Subject } from 'rxjs'
import {
  ContractDataModel, ContractGrantModel,
  ContractRawData,
  ContractRawDataEntityId,
  ContractRawDataNumber,
  ContractRawDataString
} from './contract.model'
import { SignerService } from '@services/signer/signer.service'
import { IWithApiMixin, IInvokeScriptTransaction } from '@waves/ts-types'
import { InvokeResponseInterface } from '../../interface'

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private apiGetAddressData = new URL('/addresses/data/' + this.api.contractAddress, this.api.rest)
  private contractRefresh$: Subject<null> = new Subject()
  private averageOperationSpeed = 5000
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
    @Inject(API) private readonly api: AppApiInterface,
    private readonly signerService: SignerService
  ) {
  }

  refresh () {
    this.contractRefresh$.next(null)
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
    return this.stream.pipe(map((data) => {
      return data?.tasks[entityId]
    }))
  }

  // dapp

  public addDAOMember (members: string) {
    this.signerService.invoke('addDAOMember', [
      { type: 'string', value: members }
    ])
  }

  public addGroupMember (members: string) {
    this.signerService.invoke('addGroupMember', [
      { type: 'string', value: members }
    ])
  }

  public addTask (taskName: string, reward?: number) {
    this.signerService.invoke('addTask', [{ type: 'string', value: taskName }])
      .then((e) => {
        if (reward) {
          const result = e as unknown as InvokeResponseInterface
          this.addTaskDetails(result.id, reward)
        }
      })
      .finally(() => {
        if (!reward) {
          setTimeout(() => {
            this.refresh()
          }, this.averageOperationSpeed)
        }
      })
  }

  public rateTask (taskId: string, rate: number) {
    this.signerService.invoke('rateTask', [
      { type: 'string', value: taskId },
      { type: 'integer', value: rate }
    ])
  }

  public addTaskDetails (taskId: string, reward: number) {
    this.signerService.invoke('addTaskDetails',
      [{ type: 'string', value: taskId }],
      [{ assetId: 'WAVES', amount: reward }])
      .finally(() => {
        setTimeout(() => {
          this.refresh()
        }, this.averageOperationSpeed)
      })
  }

  public voteForTaskProposal (taskId: string, voteValue: number) {
    this.signerService.invoke('voteForTaskProposal', [
      { type: 'string', value: taskId },
      { type: 'integer', value: voteValue }
    ])
  }

  public finishTaskProposalVoting (taskId: string) {
    this.signerService.invoke('finishTaskProposalVoting', [
      { type: 'string', value: taskId }
    ])
  }

  public applyForTask (taskId: string, teamName: string) {
    this.signerService.invoke('applyForTask', [
      { type: 'string', value: taskId },
      { type: 'string', value: teamName }
    ])
  }

  public voteForApplicant (taskId: string, teamIdentifier: string, voteValue: number) {
    this.signerService.invoke('voteForApplicant', [
      { type: 'string', value: taskId },
      { type: 'string', value: teamIdentifier },
      { type: 'integer', value: voteValue }
    ])
  }

  public finishApplicantsVoting (taskId: string) {
    this.signerService.invoke('finishApplicantsVoting', [
      { type: 'string', value: taskId }
    ])
  }

  public startWork (taskId: string) {
    this.signerService.invoke('startWork', [
      { type: 'string', value: taskId }
    ])
  }

  public acceptWorkResult (taskId: string) {
    this.signerService.invoke('acceptWorkResult', [
      { type: 'string', value: taskId }
    ])
  }
}
