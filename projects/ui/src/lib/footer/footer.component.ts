import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { ContractService } from '@services/contract/contract.service'

@Component({
  selector: 'ui-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit {
  constructor (public contractService: ContractService) {} // eslint-disable-line

  ngOnInit (): void {}
}
