import { Component, Inject, OnInit } from '@angular/core'
import { GRANTS, GRANTS_PROVIDERS } from './listing.providers'
import { ContractGrantModel } from '@services/contract/contract.model'
import { LoadingWrapperModel } from '@libs/loading-wrapper/loading-wrapper'
import { APP_CONSTANTS, AppConstantsInterface } from '@constants'

@Component({
  selector: 'ui-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
  providers: GRANTS_PROVIDERS
})
export class ListingComponent implements OnInit {
  constructor (
      @Inject(APP_CONSTANTS) public readonly constants: AppConstantsInterface,
      @Inject(GRANTS) public readonly grants: LoadingWrapperModel<ContractGrantModel[]>
  ) { }

  ngOnInit (): void {}

  trackByFn (index: number) {
    return index
  }
}
