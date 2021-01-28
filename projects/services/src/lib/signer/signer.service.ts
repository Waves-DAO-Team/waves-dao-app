import { Inject, Injectable } from '@angular/core'
import { Signer, IUserData } from '@waves/signer/'
import Provider from '@waves.exchange/provider-web'
import { API, AppApiInterface } from '@constants'
import {
  SignerUser,
  SignerInvokeArgs,
  TransactionRawState,
  TransactionState,
  TransactionsSuccessResult
} from './signer.model'
import { BehaviorSubject, from, Observable } from 'rxjs'
import { publishReplay, refCount, tap, switchMap, retryWhen, delay, map, take } from 'rxjs/operators'
import {
  TTransactionFromAPI, TTransactionFromAPIMap,
} from '@waves/ts-types';
import {
  IInvoke, IInvokeWithType,
  IMoney, TLong, TParamsToApi, TParamsToSign,
} from '@waves/signer/cjs/interface';
import { HttpClient } from '@angular/common/http'
import { translate } from '@ngneat/transloco'
import { MatSnackBar } from '@angular/material/snack-bar'
import { StorageService } from '@services/storage/storage.service'
import {TTransactionsApi1} from '@waves/signer/cjs/api';

@Injectable({
  providedIn: 'root'
})
export class SignerService {
  public readonly signer!: Signer

  private readonly user$: BehaviorSubject<SignerUser> = new BehaviorSubject({ name: '', address: '', publicKey: '', balance: '' })

  public user: Observable<SignerUser> = this.user$.pipe(tap((data) => {
    this.storageService.userData = data
  }), publishReplay(1), refCount())

  constructor (
    @Inject(API) private readonly api: AppApiInterface,
    private readonly http: HttpClient,
    private readonly snackBar: MatSnackBar,
    private storageService: StorageService
  ) {
    this.signer = new Signer({
      // Specify URL of the node on Testnet
      NODE_URL: api.nodes // eslint-disable-line
    })
    this.signer.setProvider(new Provider(api.signer))

    this.user$.next(this.storageService.userData as SignerUser)
  }

  public login (): Observable<Observable<SignerUser>> {
    return from(
      this.signer.login()
        .then((user: IUserData) => {
          this.signer.getBalance()
            .then((res) => {
              this.user$.next({
                ...user,
                balance: res[0].amount.toString(),
                name: user.address.slice(0, 3) + '…' + user.address.slice(-3)
              })
            })
            .catch((err) => {
              this.snackBar.open(err, translate('messages.error'))
              throw new Error(translate('messages.getBalanceError'))
            })
          return this.user
        })
    )
  }

  public logout (): Observable<void> {
    this.user$.next({ name: '', address: '', publicKey: '', balance: '' })
    return from(this.signer.logout())
  }

  public invokeProcess (
    contractAddress: string,
    command: string,
    args: SignerInvokeArgs[],
    payment: IMoney[] = []
  ): Observable<TransactionsSuccessResult> {
    return from(this.signer.invoke({
      payment,
      dApp: contractAddress,
      call: {
        function: command,
        args
      }
    } as IInvoke).sign()).pipe(
      take(1),
      tap(() => {
        this.snackBar.open(translate('messages.startTransaction'), translate('messages.ok'))
      }),
      switchMap((tx: TParamsToSign<IInvokeWithType>) => from(this.signer.broadcast(tx))),
      // @ts-ignore
      switchMap((data) => this.status(data?.id)),
      tap(() => {
        this.snackBar.open('Transaction is complete', translate('messages.ok'))
      })
    )
  }

  status (tx: string): Observable<TransactionsSuccessResult> {
    const url = new URL('/transactions/status/', this.api.rest)
    return this.http.get<TransactionRawState>(url.href, {
      params: {
        id: tx
      },
      headers: { accept: 'application/json; charset=utf-8' }
    }).pipe(
      map((data: TransactionState[]) => {
        const confirmation = data.find((state: TransactionState) =>
          state.status === 'confirmed' && state.confirmations >= this.api.confirmations)

        console.log('Confirmation', confirmation)
        if (!confirmation) {
          throw new Error('wait')
        }

        return confirmation as TransactionsSuccessResult
      }),
      retryWhen((data) => data.pipe(delay(1000)))
    )
  }
}
