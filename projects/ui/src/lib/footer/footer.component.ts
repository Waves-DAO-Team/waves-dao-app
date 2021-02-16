import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core'
import { ContractService } from '@services/contract/contract.service'
import {API, AppApiInterface} from "@constants";

@Component({
  selector: 'ui-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit {
  constructor (
    public contractService: ContractService,
    @Inject(API) public readonly api: AppApiInterface,
  ) {} // eslint-disable-line

  ngOnInit (): void {}
}
