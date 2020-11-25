import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { environment } from '@dapp/src/environments/environment'
import { ContractService } from '@services/contract/contract.service'

@Component({
  selector: 'ui-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit {
  environment = environment;

  ngOnInit (): void {}
  constructor (public contractService: ContractService) {
  }

  setEnv (address: string) {
    environment.apis.contractAddress = address
    this.contractService.switchContract(address)
  }
}
