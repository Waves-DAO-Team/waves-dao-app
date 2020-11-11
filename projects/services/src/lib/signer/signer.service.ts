import { Inject, Injectable } from '@angular/core'
import { Signer, IUserData } from '@waves/signer/'
import Provider from '@waves.exchange/provider-web'
import { API, AppApiInterface } from '@constants'
import { SignerUser } from './signer.model'
import { from, Observable, Subject } from 'rxjs'
import { publishReplay, refCount } from 'rxjs/operators'
import { UserService } from '@services/user/user.service'

@Injectable({
  providedIn: 'root'
})
export class SignerService {
  private readonly signer: Signer

  private user$: Subject<SignerUser> = new Subject()

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
}
