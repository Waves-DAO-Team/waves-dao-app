import {Inject, Injectable, isDevMode} from '@angular/core'
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
  ContractGroupContext, ContractMembershipDataModel,
  ContractRawData,
  ContractRawDataString,
} from '@services/contract/contract.model'
import {RequestService} from '@services/request/request.service'
import {RequestModel} from '@services/request/request.model'

@Injectable({
  providedIn: 'root'
})
export class MembershipService {
  private readonly address = this.api.management.membership
  private readonly membershipState$ = this.requestService.getContract(this.address)
  .pipe(
      map((data: RequestModel<ContractRawData>): RequestModel<ContractMembershipDataModel> => ({
        status: data.status,
        error: data.error,
        payload: {
          ...this.prepareData(data.payload),
          manager: this.address,
          address: this.address
        }
      }))
  )

  public stream = this.membershipState$.pipe(
    publishReplay(1),
    refCount()
  )

  constructor (
    private readonly signerService: SignerService,
    private readonly snackBar: MatSnackBar,
    private readonly http: HttpClient,
    private readonly storageService: StorageService,
    private readonly requestService: RequestService,
    @Inject(API) private readonly api: AppApiInterface
  ) {
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

  refresh (): void {
    if (isDevMode()) {
      console.log('Refresh memberships')
    }
    this.requestService.refresh(this.address);
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

    // Todo rewrite this recursive function
    // @ts-ignore: Complex case
    return data.reduce((orig: ContractGroupContext, item: ContractRawDataString) => {
      const keys = item.key.split('_')
      this.group(keys, orig, item)
      return orig
    }, {})
  }
}
