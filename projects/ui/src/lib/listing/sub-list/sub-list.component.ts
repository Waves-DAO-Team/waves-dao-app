import {Component, HostBinding, Inject, Input, OnInit, Type} from '@angular/core'
import {
  ContractGrantExtendedModel
} from '@services/contract/contract.model'
import { APP_CONSTANTS, AppConstantsInterface } from '@constants'
import { GrantsVariationType } from '@services/static/static.model'

@Component({
  selector: 'ui-sub-list',
  templateUrl: './sub-list.component.html',
  styleUrls: ['./sub-list.component.scss']
})
export class SubListComponent implements OnInit {
  @Input() contract: GrantsVariationType | null = null;
  @HostBinding('class.enable') @Input() grants: ContractGrantExtendedModel[] | null = null
  @Input() isImportant = false
  // @ts-ignore
  @Input() public type: 'default' | 'active'
  @Input() title: string | null = null

  constructor (
      @Inject(APP_CONSTANTS) public readonly constants: AppConstantsInterface

  ) {
  }

  ngOnInit (): void {}
}
