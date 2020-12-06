import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core'
import {
  CONTRACT,
  LISTING_PAGE_PROVIDERS
} from './listing-page.providers'
import { LoadingWrapperModel } from '@libs/loading-wrapper/loading-wrapper'
import { GrantsVariationType } from '@services/contract/contract.model'

@Component({
  selector: 'app-listing-page',
  templateUrl: './listing-page.component.html',
  styleUrls: ['./listing-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: LISTING_PAGE_PROVIDERS
})
export class ListingPageComponent implements OnInit {
  constructor (
      @Inject(CONTRACT) public contract: LoadingWrapperModel<GrantsVariationType>
  ) {}

  ngOnInit (): void {

  }
}
