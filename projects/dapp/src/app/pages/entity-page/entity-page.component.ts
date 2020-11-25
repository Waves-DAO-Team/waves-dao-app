import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core'
import { ENTITY, ENTITY_PAGE_PROVIDERS } from '@pages/entity-page/entity-page.providers'
import { APP_CONSTANTS, AppConstantsInterface } from '@constants'
import { LoadingWrapperModel } from '@libs/loading-wrapper/loading-wrapper'
import { ContractGrantModel } from '@services/contract/contract.model'
import { UserService } from '@services/user/user.service'

@Component({
  selector: 'app-entity-page',
  templateUrl: './entity-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: ENTITY_PAGE_PROVIDERS
})
export class EntityPageComponent implements OnInit {
  constructor (
      @Inject(APP_CONSTANTS) public readonly constants: AppConstantsInterface,
      @Inject(ENTITY) public readonly entity: LoadingWrapperModel<ContractGrantModel>
  ) {
  }

  ngOnInit (): void {
  }
}
