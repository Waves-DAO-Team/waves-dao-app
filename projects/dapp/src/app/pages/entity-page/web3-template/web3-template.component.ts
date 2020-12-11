import { Component, Input, OnInit } from '@angular/core'
import { ContractGrantModel } from '@services/contract/contract.model'
import { GrantsVariationType } from '@services/static/static.model'
import {CommonContractService} from "@services/contract/common-contract.service";
import {DisruptiveContractService} from "@services/contract/disruptive-contract.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SignerService} from "@services/signer/signer.service";
import {take} from "rxjs/operators";
import {translate} from "@ngneat/transloco";

@Component({
  selector: 'app-web3-template',
  templateUrl: './web3-template.component.html',
  styleUrls: ['./web3-template.component.scss']
})
export class Web3TemplateComponent {

  @Input() public readonly grant: ContractGrantModel = {}
  @Input() public readonly contract!: GrantsVariationType

  constructor (
    public disruptiveContractService: DisruptiveContractService,
    private snackBar: MatSnackBar,
    public signerService: SignerService
  ) {}

  vote (value: 'like' | 'dislike') {
    const id = this.grant.id || ''
    this.disruptiveContractService.voteForTaskProposal(id, value)
  }

  signup () {
    this.signerService.login()
      .pipe(take(1))
      .subscribe(() => {
      }, (error) => {
        this.snackBar.open(error, translate('messages.ok'))
      })
  }

}
