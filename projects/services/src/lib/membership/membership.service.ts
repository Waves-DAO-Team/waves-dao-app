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
  ContractDataModel,
  ContractRawData, ContractRawDataNumber,
  ContractRawDataString
} from '@services/contract/contract.model'

@Injectable({
  providedIn: 'root'
})
export class MembershipService {
  private refresh$ = new Subject();

  private address = this.api.management.membership;

  private membershipState$ = this.getContractData(this.address)

  public stream = this.membershipState$.pipe(
    publishReplay(1),
    refCount()
  )

  constructor (
      private readonly signerService: SignerService,
      private snackBar: MatSnackBar,
      private readonly http: HttpClient,
      private storageService: StorageService,
      @Inject(API) private readonly api: AppApiInterface
  ) {}

  // ToDo избавится от дублирования фуекций из contract Service
  public getContractData (address: string) {
    const url = new URL('/addresses/data/' + address, this.api.rest)
    return this.http.get<Observable<ContractRawData>>(url.href, {
      headers: { accept: 'application/json; charset=utf-8' }
    }).pipe(
      // tap((data) => {
      //   console.log('GET members data', data)
      // }),
      // // Todo поправить типизацию, пришлось лезть в контракт и переделывать структуру данных
      // @ts-ignore
      repeatWhen(() => this.refresh$),
      map((data: ContractRawData) => {
        return {
          ...this.prepareData(data),
          owner: address
        }
      })
    )
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
