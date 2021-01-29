import { Inject, Injectable } from '@angular/core'
import { EMPTY, Observable, Subject } from 'rxjs'
import { TransactionsSuccessResult } from '@services/signer/signer.model'
import {
  catchError,
  map,
  publishReplay,
  refCount,
  repeatWhen,
  tap
} from 'rxjs/operators'
import { translate } from '@ngneat/transloco'
import { HttpClient } from '@angular/common/http'
import { StorageService } from '@services/storage/storage.service'
import { API, AppApiInterface } from '@constants'
import { SignerService } from '@services/signer/signer.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import {
  ContractDataIterationModel,
  ContractDataModel,
  ContractRawData, ContractRawDataNumber,
  ContractRawDataString
} from '@services/contract/contract.model'
import { RequestsService } from '@services/requests-service/requests.service'

@Injectable({
  providedIn: 'root'
})
export class MembershipService {
  private readonly address = this.api.management.membership
  private readonly membershipState$ = this.getContractData(this.address)
  private readonly refresh$ = new Subject()

  public stream = this.membershipState$.pipe(
    publishReplay(1),
    refCount()
  )

  constructor (
    private readonly signerService: SignerService,
    private readonly snackBar: MatSnackBar,
    private readonly http: HttpClient,
    private readonly storageService: StorageService,
    private readonly requestsService: RequestsService,
    @Inject(API) private readonly api: AppApiInterface
  ) {
  }

  public getContractData (address: string) {
    return this.requestsService.getContractData(address)
      .pipe(
        repeatWhen(() => this.refresh$),
        map((data: ContractRawData) => ({
          ...this.prepareData(data),
          owner: address
        }))
      )
  }

  private group (keys: string[], context: ContractDataIterationModel, value: ContractRawDataString | ContractRawDataNumber): void {
    const key: string | undefined = keys.shift()
    if (!key) {
      return
    }

    if (!context[key]) {
      context[key] = keys.length === 0 ? value : {}
    }

    return this.group(keys, context[key], value)
  }

  private prepareData (data: ContractRawData): ContractDataModel {
    return data.reduce((orig: {} | ContractDataIterationModel, item) => {
      const keys = item.key.split('_')
      this.group(keys, orig, item)
      return orig
    }, {}) as ContractDataModel
  }

  public addDAOMember (members: string): Observable<TransactionsSuccessResult> {
    return this.signerService.invokeProcess(
      this.address,
      'addDAOMember',
      [{ type: 'string', value: members }]
    ).pipe(
      catchError((error) => {
        const mes = error.message ? error.message : translate('messages.transaction_rejected')
        this.snackBar.open(mes)
        return EMPTY
      }),
      tap(() => {
        this.refresh()
        this.snackBar.open('Transaction is complete', translate('messages.ok'))
      })
    )
  }

  public addGroupMember (members: string): Observable<TransactionsSuccessResult> {
    return this.signerService.invokeProcess(
      this.address,
      'addGroupMember',
      [{ type: 'string', value: members }]
    )
      .pipe(
        catchError((error) => {
          const mes = error.message ? error.message : translate('messages.transaction_rejected')
          this.snackBar.open(mes)
          return EMPTY
        }),
        tap(() => {
          this.refresh()
          this.snackBar.open('Transaction is complete', translate('messages.ok'))
        })
      )
  }

  refresh () {
    console.log('Refresh memberships')
    this.refresh$.next(null)
  }
}
