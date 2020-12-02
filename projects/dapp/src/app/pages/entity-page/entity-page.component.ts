import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core'
import { ENTITY, ENTITY_PAGE_PROVIDERS } from '@pages/entity-page/entity-page.providers'
import { APP_CONSTANTS, AppConstantsInterface } from '@constants'
import { LoadingWrapperModel } from '@libs/loading-wrapper/loading-wrapper'
import { ContractGrantModel } from '@services/contract/contract.model'
import { Location } from '@angular/common'

@Component({
  selector: 'app-entity-page',
  templateUrl: './entity-page.component.html',
  styleUrls: ['./entity-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: ENTITY_PAGE_PROVIDERS
})
export class EntityPageComponent implements OnInit, OnDestroy {
  constructor (
    private location: Location,
    @Inject(APP_CONSTANTS) public readonly constants: AppConstantsInterface,
    @Inject(ENTITY) public entity: LoadingWrapperModel<ContractGrantModel>
  ) {}

  ngOnInit (): void {}

  goBack (): void {
    this.location.back()
  }

  ngOnDestroy () {
    this.entity.destroy()
  }
}
