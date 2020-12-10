import { Component, Input, OnInit } from '@angular/core'
import { ContractGrantModel } from '@services/contract/contract.model'
import { GrantsVariationType } from '@services/static/static.model'

@Component({
  selector: 'app-default-template',
  templateUrl: './default-template.component.html',
  styleUrls: ['./default-template.component.scss']
})
export class DefaultTemplateComponent implements OnInit {
  @Input() public readonly grant: ContractGrantModel = {}

  @Input() public readonly contract!: GrantsVariationType

  constructor () { }

  ngOnInit (): void {
  }
}
