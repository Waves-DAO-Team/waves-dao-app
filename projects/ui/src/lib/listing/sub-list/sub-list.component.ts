import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Inject,
  Input,
} from '@angular/core'

import {
  ContractGrantExtendedModel
} from '@services/contract/contract.model'
import { APP_CONSTANTS, AppConstantsInterface } from '@constants'
import { GrantsVariationType } from '@services/static/static.model'

@Component({
  selector: 'ui-sub-list',
  templateUrl: './sub-list.component.html',
  styleUrls: ['./sub-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubListComponent {
  @Input() contract: GrantsVariationType | null = null
  @HostBinding('class.enable') @Input() grants: ContractGrantExtendedModel[] | null = null
  @Input() isImportant = false

  @Input() public type: 'default' | 'active' = 'default'
  @Input() title: string | null = null

  constructor (
    @Inject(APP_CONSTANTS) public readonly constants: AppConstantsInterface
  ) {}
}
