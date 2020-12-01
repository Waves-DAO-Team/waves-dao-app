import { Inject, Injectable } from '@angular/core'
import { Signer, IUserData } from '@waves/signer/'
import Provider from '@waves.exchange/provider-web'
import { API, AppApiInterface } from '@constants'
import { SignerUser, SignerInvokeArgs, TransactionRawState, TransactionState } from './signer.model'
import { BehaviorSubject, from, Observable } from 'rxjs'
import { publishReplay, refCount, tap, switchMap, retryWhen, delay, map } from 'rxjs/operators'
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
      private readonly router: Router
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
            console.log('login(ser: IUserData):', user)
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

  public invokeProcess (contractAddress: string, command: string, args: SignerInvokeArgs[], payment: Array<IMoney> = []) {
    return from(this.signer.invoke({
      payment,
      dApp: contractAddress,
      call: {
        function: command,
        // @ts-ignore
        args
      }
    }).sign()).pipe(
    // @ts-ignore
      switchMap((tx) => {
        return from(this.signer.broadcast(tx))
      }),
      switchMap((data: TTransactionFromAPI<TLong>) => {
        return this.status(data.id)
      }))
  }

  status (tx: string) {
    const url = new URL('/transactions/status/', this.api.rest)
    return this.http.get<TransactionRawState>(url.href, {
      params: {
        id: tx
      },
      headers: { accept: 'application/json; charset=utf-8' }
    }).pipe(
      map((data: TransactionState[]) => {
        data.forEach((state: TransactionState) => {
          if (state.status === 'confirmed' && state.confirmations === this.api.confirmations) {
            return state
          }
        })
        throw new Error('wait')
      }),
      retryWhen((data) => {
        console.log('Retry')
        return data.pipe(delay(1000))
      }),
      tap((data: TransactionState) => {
        console.log('After retry', data)
      })
    )
  }

  test () {
    this.invokeProcess('3MtV1AQ8fEPk76tjKgvrufuMe5aA3q4TviQ', 'test', [
      { type: 'string', value: 'TEST 1' }
    ]).subscribe((data) => {
      console.log('data', data)
    })
  }
}
