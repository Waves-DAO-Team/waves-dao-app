import {Inject, Injectable, isDevMode} from '@angular/core'
import {Signer, UserData} from '@waves/signer/'
import {ProviderWeb} from '@waves.exchange/provider-web'
import {API, AppApiInterface} from '@constants'
import {
  SignerUser,
  TransactionRawState,
  TransactionState,
  TransactionsSuccessResult, ISignerInvokeAnyData
} from './signer.model'
import {BehaviorSubject, from, Observable} from 'rxjs'
import {publishReplay, refCount, tap, switchMap, retryWhen, delay, map, take} from 'rxjs/operators'
import {HttpClient} from '@angular/common/http'
import {translate} from '@ngneat/transloco'
import {MatSnackBar} from '@angular/material/snack-bar'
import {StorageService} from '@services/storage/storage.service'
import {InvokeScriptCallArgument} from '@waves/ts-types/src/parts'

@Injectable({
  providedIn: 'root'
})
export class SignerService {
  public readonly signer!: Signer

  private readonly user$: BehaviorSubject<SignerUser> = new BehaviorSubject({
    name: '',
    address: '',
    publicKey: '',
    balance: ''
  })

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
    this.signer.setProvider(new ProviderWeb(api.signer)).catch((e) => {
      if (isDevMode()) {
        console.log('Error ProviderWeb:', e)
      }
    })

    this.user$.next(this.storageService.userData as SignerUser)
  }

  public login (): Observable<Observable<SignerUser>> {
    return from(
      this.signer.login()
        .then((user: UserData) => {
          this.signer.getBalance()
            .then((res) => {
              if (isDevMode()) {
                console.log('getBalance:', res)
              }
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
    this.user$.next({name: '', address: '', publicKey: '', balance: ''})
    return from(this.signer.logout())
  }

  public invokeProcess (
    contractAddress: string,
    command: string,
    args: Array<InvokeScriptCallArgument<string | number>>,
    payment: {
      assetId: string,
      amount: number | string,
    }[] = []
  ): Observable<TransactionsSuccessResult> {
    if (isDevMode()) {
      console.log('invokeProcess params contractAddress:', contractAddress)
      console.log('invokeProcess params command:', command)
      console.log('invokeProcess params args:', args)
      console.log('invokeProcess params payment:', payment)
    }
    return from(this.signer.invoke({
      ...(payment && payment.length ? {
        payment
      } : {}),
      dApp: contractAddress,
      call: {
        function: command,
        args
      },
      feeAssetId: null
    }).sign()).pipe(
      take(1),
      tap(() => {
        this.snackBar.open(translate('messages.startTransaction'), translate('messages.ok'))
      }),
      switchMap((tx) => from(this.signer.broadcast(tx).catch((e) => {
        console.warn(e)
        throw new Error('broadcast could not process the request:')
      }))),
      tap(
        (e) => console.log('+++', e)
      ),
      switchMap((data) => {
        const d: ISignerInvokeAnyData = {
          ...data
        }
        return this.status(d.id)
      }),
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
      headers: {accept: 'application/json; charset=utf-8'}
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
