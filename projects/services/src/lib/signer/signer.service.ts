import { Inject, Injectable } from '@angular/core'
import Signer from '@waves/signer'
import Provider from '@waves.exchange/provider-web'
import { API, AppApiInterface } from '@constants'

@Injectable({
  providedIn: 'root'
})
export class SignerService {
  private readonly signer: Signer

  constructor (
      @Inject(API) private readonly api: AppApiInterface
  ) {
    this.signer = new Signer({
      // Specify URL of the node on Testnet
      NODE_URL: api.nodes
    })
    this.signer.setProvider(new Provider())
  }

  login () {
    this.signer.login().then((user) => {
      console.log('User', user)
    })
  }
}
