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
  ContractRawDataString
} from './contract.model'
import { SignerService } from '@services/signer/signer.service'
import { InvokeResponseInterface } from '../../interface'
import { PopupService } from '@services/popup/popup.service'

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private contractAddress$: BehaviorSubject<string> = new BehaviorSubject(this.api.contractAddress)
  private averageOperationSpeed = 10000
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
    @Inject(API) private readonly api: AppApiInterface,
    private readonly signerService: SignerService,
    private popupService: PopupService
  ) {}

  public refresh (address: string = this.api.contractAddress) {
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
    return this.stream.pipe(map((data: ContractDataModel) => {
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
    }))
  }

  public getAddress (): string {
    return this.contractAddress$.getValue()
  }

  // dapp
  public addDAOMember (members: string) {
    this.signerService.invoke('addDAOMember', [
      { type: 'string', value: members }
    ])
      .catch((res) => {
        this.popupService.add(res, 'addDAOMember catch')
      })
      .then((res) => {
        this.popupService.add(JSON.stringify(res), 'addDAOMember then')
        setTimeout(() => {
          this.refresh()
        }, this.averageOperationSpeed)
      })
      .finally(() => {
        this.popupService.add('', 'addDAOMember finally')
        this.doRefreshTimeOut()
      })
  }

  public addGroupMember (members: string) {
    this.signerService.invoke('addGroupMember', [
      { type: 'string', value: members }
    ])
      .catch((res) => {
        this.popupService.add(res, 'addGroupMember catch')
      })
      .then((res) => {
        this.popupService.add(JSON.stringify(res), 'addGroupMember then')
        this.doRefreshTimeOut()
      })
      .finally(() => {
        this.popupService.add('', 'addGroupMember finally')
        this.doRefreshTimeOut()
      })
  }

  public addTask (taskName: string, reward: number, link: string) {
    this.signerService.invoke('addTask', [
      { type: 'string', value: taskName },
      { type: 'string', value: link }
    ])
      .catch((res) => {
        this.popupService.add(res, 'addTask catch')
      })
      .then((res) => {
        // @ts-ignore
        this.popupService.add(res.toString(), 'addTask then')
        if (reward) {
          const result = res as unknown as InvokeResponseInterface
          this.addTaskDetails(result.id, reward)
        }
      })
      .finally(() => {
        this.popupService.add('', 'addTask finally')
        // setTimeout(() => {
        //   this.refresh()
        // }, this.averageOperationSpeed)
        this.doRefreshTimeOut()
      })
  }

  public addTaskDetails (taskId: string, reward: number) {
    console.log('addTaskDetails:', taskId, reward)
    this.signerService.invoke('addTaskDetails',
      [{ type: 'string', value: taskId }],
      [{ assetId: 'WAVES', amount: reward }])
      .catch((res) => {
        this.popupService.add(res, 'addTaskDetails catch')
      })
      .then((res) => {
        // @ts-ignore
        this.popupService.add(res.toString(), 'addTaskDetails then')
        // setTimeout(() => {
        //   this.refresh()
        // }, this.averageOperationSpeed)
        this.doRefreshTimeOut()
      })
      .finally(() => {
        this.popupService.add('', 'addTaskDetails finally')
        // setTimeout(() => {
        //   this.refresh()
        // }, this.averageOperationSpeed)
        this.doRefreshTimeOut()
      })
  }

  public voteForTaskProposal (taskId: string, voteValue: 'like' | 'dislike') {
    this.signerService.invoke('voteForTaskProposal', [
      { type: 'string', value: taskId },
      { type: 'string', value: voteValue }
    ])
      .catch((res) => {
        this.popupService.add(res, 'voteForTaskProposal this')
      })
      .then((res) => {
        // @ts-ignore
        this.popupService.add(res.toString(), 'voteForTaskProposal then')
      })
      .finally(() => {
        this.popupService.add('', 'voteForTaskProposal finally')
        // setTimeout(() => {
        //   this.refresh()
        // }, this.averageOperationSpeed)
        this.doRefreshTimeOut()
      })
  }

  public finishTaskProposalVoting (taskId: string) {
    this.signerService.invoke('finishTaskProposalVoting', [
      { type: 'string', value: taskId }
    ])
      .catch((res) => {
        this.popupService.add(res, 'finishTaskProposalVoting')
      })
      .then((res) => {
        // @ts-ignore
        this.popupService.add(res.toString(), 'finishTaskProposalVoting then')
        // setTimeout(() => {
        //   this.refresh()
        // }, this.averageOperationSpeed)
        this.doRefreshTimeOut()
      })
      .finally(() => {
        this.popupService.add('', 'finishTaskProposalVoting finally')
        this.doRefreshTimeOut()
      })
  }

  public applyForTask (taskId: string, teamName: string, link: string): void {
    this.popupService.add(`${taskId} ${teamName} ${link}`, 'applyForTask')
    this.signerService.invoke('applyForTask', [
      { type: 'string', value: taskId },
      { type: 'string', value: teamName },
      { type: 'string', value: link }
    ])
      .then((res) => {
        this.popupService.add(res.toString(), 'applyForTask then')
      })
      .catch((res) => {
        this.popupService.add(res, 'applyForTask catch')
      })
      .finally(() => {
        this.popupService.add('', 'applyForTask finally')
        // setTimeout(() => {
        //   this.refresh()
        // }, this.averageOperationSpeed)
        this.doRefreshTimeOut()
      })
  }

  public voteForApplicant (taskId: string, teamIdentifier: string, voteValue: string) {
    const text = `taskId:${taskId} teamIdentifier:${teamIdentifier} voteValue:${voteValue}`
    this.popupService.add(text, '==========================================voteForApplicant')
    this.signerService.invoke('voteForApplicant', [
      { type: 'string', value: taskId },
      { type: 'string', value: teamIdentifier },
      { type: 'string', value: voteValue }
    ])
      .catch((res) => {
        this.popupService.add(res, 'voteForApplicant catch')
      })
      .then(res => {
        this.popupService.add(JSON.stringify(res), 'voteForApplicant catch')
      })
      .finally(() => {
        this.popupService.add('', 'voteForApplicant finally')
        // setTimeout(() => {
        //   this.refresh()
        // }, this.averageOperationSpeed)
        this.doRefreshTimeOut()
      })
  }

  public finishApplicantsVoting (taskId: string) {
    this.signerService.invoke('finishApplicantsVoting', [
      { type: 'string', value: taskId }
    ])
      .catch((res) => {
        this.popupService.add(res, 'finishApplicantsVoting catch')
      })
      .then((res) => {
        this.popupService.add(JSON.stringify(res), 'finishApplicantsVoting then')
      })
      .finally(() => {
        this.popupService.add('', 'finishApplicantsVoting finally')
        // setTimeout(() => {
        //   this.refresh()
        // }, this.averageOperationSpeed)
        this.doRefreshTimeOut()
      })
  }

  public startWork (taskId: string) {
    this.signerService.invoke('startWork', [
      { type: 'string', value: taskId }
    ])
      .catch((res) => {
        this.popupService.add(res, 'startWork catch')
      })
      .then((res) => {
        this.popupService.add(JSON.stringify(res), 'startWork then')
      })
      .finally(() => {
        this.popupService.add('', 'startWork finally')
        // setTimeout(() => {
        //   this.refresh()
        // }, this.averageOperationSpeed)
        this.doRefreshTimeOut()
      })
  }

  public rejectTask (taskId: string) {
    this.signerService.invoke('rejectTask', [
      { type: 'string', value: taskId }
    ])
      .catch((res) => {
        this.popupService.add(res, 'rejectTask catch')
      })
      .then((res) => {
        this.popupService.add(JSON.stringify(res), 'rejectTask then')
      })
      .finally(() => {
        this.popupService.add('', 'rejectTask finally')
        this.doRefreshTimeOut()
      })
  }

  public acceptWorkResult (taskId: string, reportLink: string) {
    this.signerService.invoke('acceptWorkResult', [
      { type: 'string', value: taskId },
      // { type: 'string', value: teamIdentifier }
      { type: 'string', value: reportLink }
    ])
      .catch((res) => {
        this.popupService.add(res, 'acceptWorkResult catch')
      })
      .then((res) => {
        this.popupService.add(JSON.stringify(res), 'acceptWorkResult then')
      })
      .finally(() => {
        this.popupService.add('', 'acceptWorkResult finally')
        // setTimeout(() => {
        //   this.refresh()
        // }, this.averageOperationSpeed)
        this.doRefreshTimeOut()
      })
  }
}
