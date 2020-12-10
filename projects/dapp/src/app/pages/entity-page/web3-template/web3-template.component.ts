import { Component, Input, OnInit } from '@angular/core'
import { ContractGrantModel } from '@services/contract/contract.model'
import { GrantsVariationType } from '@services/static/static.model'
import {CommonContractService} from "@services/contract/common-contract.service";
import {DisruptiveContractService} from "@services/contract/disruptive-contract.service";

@Component({
  selector: 'app-web3-template',
  templateUrl: './web3-template.component.html',
  styleUrls: ['./web3-template.component.scss']
})
export class Web3TemplateComponent {
  @Input() public readonly grant: ContractGrantModel = {}

  @Input() public readonly contract!: GrantsVariationType

  constructor (public disruptiveContractService: DisruptiveContractService) {}

  vote (value: 'like' | 'dislike') {
    const id = this.grant.id || ''
    this.disruptiveContractService.voteForTaskProposal(id, value)
  }
}
