import { Component, HostBinding, Inject, Input, OnInit } from '@angular/core'
import {
  ContractGrantExtendedModel,
  GrantsVariationType
} from '@services/contract/contract.model'
import { APP_CONSTANTS, AppConstantsInterface } from '@constants'

@Component({
  selector: 'ui-sub-list',
  templateUrl: './sub-list.component.html',
  styleUrls: ['./sub-list.component.scss']
})
export class SubListComponent implements OnInit {
  @Input() contract: GrantsVariationType | null = null;
  @HostBinding('class.enable') @Input() grants: ContractGrantExtendedModel[] | null = null
  @Input() isImportant = false
  @Input() title: string | null = null

  constructor (
      @Inject(APP_CONSTANTS) public readonly constants: AppConstantsInterface
  ) {
  }

  ngOnInit (): void {
    console.log('grants', this.grants)
  }
}
