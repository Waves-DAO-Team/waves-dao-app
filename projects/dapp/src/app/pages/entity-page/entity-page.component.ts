import { ChangeDetectionStrategy, Component, Inject, OnDestroy } from '@angular/core'
import { CONTRACT, ENTITY, ENTITY_PAGE_PROVIDERS } from '@pages/entity-page/entity-page.providers'
import {API, APP_CONSTANTS, AppApiInterface, AppConstantsInterface} from '@constants'
import { LoadingWrapperModel } from '@libs/loading-wrapper/loading-wrapper'
import {
  ContractGrantModel
} from '@services/contract/contract.model'
import { Location } from '@angular/common'
import { GrantsVariationType } from '@services/static/static.model'


@Component({
  selector: 'app-entity-page',
  templateUrl: './entity-page.component.html',
  styleUrls: ['./entity-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: ENTITY_PAGE_PROVIDERS
})
export class EntityPageComponent implements OnDestroy {
  constructor (
    @Inject(API) public readonly api: AppApiInterface, // eslint-disable-line
    private readonly location: Location, // eslint-disable-line
    @Inject(CONTRACT) public readonly contract: LoadingWrapperModel<GrantsVariationType>, // eslint-disable-line
    @Inject(APP_CONSTANTS) public readonly constants: AppConstantsInterface, // eslint-disable-line
    @Inject(ENTITY) public entity: LoadingWrapperModel<ContractGrantModel>, // eslint-disable-line
  ) {}

  goBack (): void {
    this.location.back()
  }

  ngOnDestroy (): void {
    this.entity.destroy()
  }
}
