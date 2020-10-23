import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { ContractService } from '@services/contract/contract.service'

@Component({
  selector: 'app-listing-page',
  templateUrl: './listing-page.component.html',
  styleUrls: ['./listing-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListingPageComponent implements OnInit {
  public readonly list = this.contractService.stream

  constructor (
      private contractService: ContractService
  ) {}

  ngOnInit (): void {

  }
}
