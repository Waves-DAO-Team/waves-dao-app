import { Inject, Injectable } from '@angular/core'
import { Signer, IUserData } from '@waves/signer/'
import Provider from '@waves.exchange/provider-web'
import { API, AppApiInterface } from '@constants'
import { SignerUser, SignerInvokeArgs, TransactionRawState, TransactionState, TransactionsSuccessResult } from './signer.model'
import { BehaviorSubject, from, Observable } from 'rxjs'
import { publishReplay, refCount, tap, switchMap, retryWhen, delay, map, take } from 'rxjs/operators'
import {
  IWithApiMixin,
  IInvokeScriptTransaction,
  TTransactionFromAPI
} from '@waves/ts-types'
import {
  IMoney, TLong
} from '@waves/signer/cjs/interface'
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import { translate } from '@ngneat/transloco'
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root'
})
export class SignerService {
  public readonly signer!: Signer

  private user$: BehaviorSubject<SignerUser> = new BehaviorSubject({ name: '', address: '', publicKey: '', balance: '' })

  public user: Observable<SignerUser> = this.user$.pipe(publishReplay(1), refCount())

  constructor (
      @Inject(API) private readonly api: AppApiInterface,
      private readonly http: HttpClient,
      private readonly router: Router,
      private snackBar: MatSnackBar
  ) {
    this.signer = new Signer({
      // Specify URL of the node on Testnet
      NODE_URL: api.nodes
    })
    this.signer.setProvider(new Provider(api.signer))
  }

  public login (): Observable<Observable<SignerUser>> {
    return from(
      this.signer.login()
        .then((user: IUserData) => {
          this.signer.getBalance().then((res) => {
            this.user$.next({
              ...user,
              balance: res[0].amount.toString(),
              name: user.address.slice(0, 3) + '…' + user.address.slice(-3)
            })
          })
          return this.user
        })
        // Todo transform errors to messages in snackbar
    )
  }

  public logout (): Observable<void> {
    this.user$.next({ name: '', address: '', publicKey: '', balance: '' })
    this.router.navigate(['/'])
    return from(this.signer.logout())
  }

  // @ts-ignore
  public invoke (contractAddress: string, command: string, args: SignerInvokeArgs[], payment: Array<IMoney> = []):
    Promise<[IInvokeScriptTransaction<string | number> & IWithApiMixin]> {
    const tx = this.signer.invoke({
      payment,
      // dApp: this.api.contractAddress,
      dApp: contractAddress,
      call: {
        function: command,
        // @ts-ignore
        args
      }
    })
    return tx.broadcast()
  }

  public invokeProcess (
    contractAddress: string,
    command: string,
    args: SignerInvokeArgs[],
    payment: Array<IMoney> = []
  ): Observable<TransactionsSuccessResult> {
    return from(this.signer.invoke({
      payment,
      dApp: contractAddress,
      call: {
        function: command,
        // @ts-ignore
        args
      }
    }).sign()).pipe(
      take(1),
      tap(() => {
        this.snackBar.open('We sent the transaction to Waves Blockchain.  You can continue using the application, we will inform you when the transaction is confirmed in Blockchain.')
      }),
      // @ts-ignore
      switchMap((tx) => {
        return from(this.signer.broadcast(tx))
      }),
      switchMap((data: TTransactionFromAPI<TLong>) => {
        return this.status(data.id)
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
      headers: { accept: 'application/json; charset=utf-8' }
    }).pipe(
      map((data: TransactionState[]) => {
        const confirmation = data.find((state: TransactionState) => {
          return state.status === 'confirmed' && state.confirmations >= this.api.confirmations
        })

        console.log('Confirmation', confirmation)
        if (!confirmation) {
          throw new Error('wait')
        }

        return confirmation as TransactionsSuccessResult
      }),
      retryWhen((data) => {
        return data.pipe(delay(1000))
      })
    )
  }
}
