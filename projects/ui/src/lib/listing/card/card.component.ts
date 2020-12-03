import { Component, Inject, Input, OnInit } from '@angular/core'
import { ContractGrantExtendedModel } from '@services/contract/contract.model'
import { APP_CONSTANTS, AppConstantsInterface } from '@constants'

@Component({
  selector: 'ui-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() grants: ContractGrantExtendedModel | null = null
  @Input() isImportant = false
  @Input() title: string | null = null

  constructor (@Inject(APP_CONSTANTS) public readonly constants: AppConstantsInterface) {
  }

  ngOnInit (): void {
  }
}
