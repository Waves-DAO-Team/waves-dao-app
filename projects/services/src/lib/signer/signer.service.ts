import { Inject, Injectable } from '@angular/core'
import { Signer, IUserData } from '@waves/signer/'
import Provider from '@waves.exchange/provider-web'
import { API, AppApiInterface } from '@constants'
import { SignerUser, SignerInvokeArgs } from './signer.model'
import { BehaviorSubject, from, Observable, ReplaySubject, Subject } from 'rxjs'
import { publishReplay, refCount, startWith } from 'rxjs/operators'
import { UserService } from '@services/user/user.service'
import { IWithApiMixin, IInvokeScriptTransaction } from '@waves/ts-types'
import { IMoney } from '@waves/signer/cjs/interface'
import { InvokeResponseInterface } from '../../interface'

@Injectable({
  providedIn: 'root'
})
export class SignerService {
  private readonly signer: Signer

  private user$: BehaviorSubject<SignerUser> = new BehaviorSubject({
    name: '',
    address: '',
    publicKey: ''
  })

  public user: Observable<SignerUser> = this.user$.pipe(
    publishReplay(1),
    refCount()

  )

  constructor (
      @Inject(API) private readonly api: AppApiInterface
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
          console.log('login(ser: IUserData):', user)
          this.user$.next({
            ...user,
            name: user.address.slice(0, 3) + '…' + user.address.slice(-3)
          })

          return this.user
        })
        // Todo transform errors to messages in snackbar
    )
  }

  public logout (): Observable<void> {
    return from(this.signer.logout())
  }

  // @ts-ignore
  public invoke (command: string, args: SignerInvokeArgs[], payment: Array<IMoney> = []):
    Promise<[IInvokeScriptTransaction<string | number> & IWithApiMixin]> {
    return this.signer.invoke({
      payment,
      dApp: this.api.contractAddress,
      call: {
        function: command,
        // @ts-ignore
        args
      }
    }).broadcast()
  }

  public invokeTest (): Promise<[IInvokeScriptTransaction<string | number> & IWithApiMixin]> {
    return this.signer.invoke({
      payment: [{
        assetId: 'WAVES',
        amount: 22
      }],
      dApp: this.api.contractAddress,
      // call: {
      //   function: 'addTaskDetails',
      //   // @ts-ignore
      //   args: [   ]
      // }
      //
      // payment: [{
      //   assetId: '73pu8pHFNpj9tmWuYjqnZ962tXzJvLGX86dxjZxGYhoK',
      //   amount: 7,
      // }],
      call: {
        function: 'addTaskDetails',
        args: [
          { type: 'string', value: '2GweZpRK94t3KNXFZwqhoZBYzHNUuCCeCpGPhF3qihaX' }
        ]
      }
    }).broadcast()
  }
}
