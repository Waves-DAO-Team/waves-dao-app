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
  ContractDataModel, ContractGrantCommonModel, ContractGrantModel,
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
  private apiGetAddressData = new URL('/addresses/data/' + this.api.contractAddress, this.api.rest)
  private contractRefresh$: Subject<null> = new Subject()
  private averageOperationSpeed = 5000
  public applicants: string[] = []
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

      // this.defineApplicants(data)
    }),
    publishReplay(1),
    refCount()
  )

  public readonly stream: Observable<ContractDataModel> = this.contractState.pipe(
    publishReplay(1),
    refCount()
  )

  public readonly streamTasks: Observable<ContractGrantRawModel[]> = this.contractState.pipe(map((contract) => {
    return Object.keys(contract?.tasks).map((entityKey: string) => {
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
  ) {
  }

  refresh () {
    this.contractRefresh$.next(null)
    this.popupService.add('refresh')
  }

  // private defineApplicants(data: ContractDataModel) {
  //
  //   let applicants: string[] = []
  //
  //     console.log('task -----', data.tasks)
  //   data.tasks.key
  // }
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

  // dapp

  public addDAOMember (members: string) {
    this.signerService.invoke('addDAOMember', [
      { type: 'string', value: members }
    ]).catch((res) => {
      this.popupService.add('addDAOMember: ' + res.message)
    }).finally(() => {
      setTimeout(() => {
        this.refresh()
        this.popupService.add('addDAOMember finally')
      }, this.averageOperationSpeed)
    })
  }

  public addGroupMember (members: string) {
    this.signerService.invoke('addGroupMember', [
      { type: 'string', value: members }
    ]).catch((res) => {
      this.popupService.add('addGroupMember: ' + res.message)
    }).finally(() => {
      setTimeout(() => {
        this.refresh()
        this.popupService.add('addGroupMember finally')
      }, this.averageOperationSpeed)
    })
  }

  public addTask (taskName: string, reward: number, link: string) {
    const tx = this.signerService.invoke('addTask', [
      { type: 'string', value: taskName },
      { type: 'string', value: link }
    ])
      .catch((res) => {
        this.popupService.add('addTask: ' + res.message)
      })
      .then((e) => {
        // console.info('=============o-----:', e)

        if (reward) {
          const result = e as unknown as InvokeResponseInterface
          // await this.signerService.signer.broadcast(result.id, {chain: true, confirmations: 2})
          this.addTaskDetails(result.id, reward)
        }
        this.popupService.add('addTask ok')
      })
      .finally(() => {
        if (!reward) {
          setTimeout(() => {
            this.refresh()
          }, this.averageOperationSpeed)
        }
      })
    // @ts-ignore

    console.log(tx)
    // tx.then((e) =>{
    //   console.log('-----------', e)
    // })
  }

  public addTaskDetails (taskId: string, reward: number) {
    // console.log('addTaskDetails ->>>>>')
    // setTimeout(()=>{
    //   console.log('ST ->>>>>')
    // },5000)
    this.signerService.invoke('addTaskDetails',
      [{ type: 'string', value: taskId }],
      [{ assetId: 'WAVES', amount: reward }])
      .catch((res) => {
        this.popupService.add('addTaskDetails: ' + res.message)
      })
      .then((res) => {
        this.popupService.add('addTaskDetails then:' + res)
        console.log('then', res)

        // this.signerService.signer.waitTxConfirm(res, 5).then((e)=>{
        //   console.log('!!! ------------------------', e)
        // })
      })
      .finally(() => {
        this.popupService.add('addTaskDetails ok')
        // setTimeout(() => {
        this.refresh()
        // console.log('finally ->>>>>')
        // }, this.averageOperationSpeed)
      })
  }

  public voteForTaskProposal (taskId: string, voteValue: 'like' | 'dislike') {
    const x = this.signerService.invoke('voteForTaskProposal', [
      { type: 'string', value: taskId },
      { type: 'string', value: voteValue }
    ]).catch((res) => {
      this.popupService.add('voteForTaskProposal: ' + res.message)
    }).then((res) => {
      console.log(res)
      // console.info('voteForTaskProposal info:', res.id)

      // core.js:4442 ERROR Error: Uncaught (in promise):
      // Object: {"error":1,"message":"failed to parse json message","cause":null,"validationErrors":{"obj"
      // :[{"msg":["\"Bus7vuhFTVBcA6gX33p4u36LFGoHNngkscw6zdnC1g7J\" is not an object"],"args":[]}]}}
      // this.signerService.signer.broadcast(res.id).then((e)=>{
      //   console.log('-------', e)
      // })
    }).finally(() => {
      setTimeout(() => {
        this.refresh()
      }, this.averageOperationSpeed)
    })
    console.log(x)
    // core.js:4442 ERROR Error: Uncaught (in promise):
    // Object: {"error":1,"message":"failed to parse json message","cause":null,"validationErrors":{"obj":
    // [{"msg":["'type' is undefined on object: {\"__zone_symbol__state\":null,\"__zone_symbol__value\":[],
    // \"__zone_symbol__finally\":\"__zone_symbol__finally\"}"],"args":[]}]}}
    // this.signerService.signer.broadcast(x).then((e)=>{
    //   console.log('-------', e)
    // })
  }

  public finishTaskProposalVoting (taskId: string) {
    this.signerService.invoke('finishTaskProposalVoting', [
      { type: 'string', value: taskId }
    ]).catch((res) => {
      this.popupService.add('finishTaskProposalVoting: ' + res.message)
    })
      .then((res) => {
        this.popupService.add('finishTaskProposalVoting: ' + res)
        setTimeout(() => {
          this.refresh()
        }, this.averageOperationSpeed)
      })
  }

  public applyForTask (taskId: string, teamName: string, link: string) {
    this.signerService.invoke('applyForTask', [
      { type: 'string', value: taskId },
      { type: 'string', value: teamName },
      { type: 'string', value: link }
    ])
      .then((res) => {
        this.popupService.add(res.toString(), 'applyForTask then')
      })
      .catch((res) => {
        this.popupService.add(res.toString(), 'applyForTask catch')
      })
      .finally(() => {
        this.popupService.add('', 'applyForTask finally')
        setTimeout(() => {
          this.refresh()
        }, this.averageOperationSpeed)
      })
  }

  public voteForApplicant (taskId: string, teamIdentifier: string, voteValue: number) {
    this.signerService.invoke('voteForApplicant', [
      { type: 'string', value: taskId },
      { type: 'string', value: teamIdentifier },
      { type: 'integer', value: voteValue }
    ]).catch((res) => {
      this.popupService.add('voteForApplicant: ' + res.message)
    })
  }

  public finishApplicantsVoting (taskId: string) {
    this.signerService.invoke('finishApplicantsVoting', [
      { type: 'string', value: taskId }
    ])
      .catch((res) => {
        this.popupService.add('finishApplicantsVoting: ' + res.message)
      })
      .then((res) => {
        // console.info('finishApplicantsVoting info', res)
        console.log(res)
      })
      .finally(() => {
        setTimeout(() => {
          this.refresh()
        }, this.averageOperationSpeed)
      })
  }

  public startWork (taskId: string) {
    this.signerService.invoke('startWork', [
      { type: 'string', value: taskId }
    ])
      .catch((res) => {
        this.popupService.add('startWork: ' + res.message)
      })
      .finally(() => {
        setTimeout(() => {
          this.refresh()
        }, this.averageOperationSpeed)
      })
  }

  public acceptWorkResult (taskId: string) {
    this.signerService.invoke('acceptWorkResult', [
      { type: 'string', value: taskId }
    ]).catch((res) => {
      this.popupService.add('acceptWorkResult: ' + res.message)
    })
  }
}
