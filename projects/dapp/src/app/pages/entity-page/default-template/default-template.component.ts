import { Component, Input, OnInit } from '@angular/core'
import { ContractGrantModel } from '@services/contract/contract.model'
import { GrantsVariationType } from '@services/static/static.model'
import {DisruptiveContractService} from "@services/contract/disruptive-contract.service";
import {take} from "rxjs/operators";
import {translate} from "@ngneat/transloco";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "@services/user/user.service";
import {SignerService} from "@services/signer/signer.service";

@Component({
  selector: 'app-default-template',
  templateUrl: './default-template.component.html',
  styleUrls: ['./default-template.component.scss']
})
export class DefaultTemplateComponent {

  @Input() public readonly grant: ContractGrantModel = {}
  @Input() public readonly contract!: GrantsVariationType

  constructor (
    public disruptiveContractService: DisruptiveContractService,
    private snackBar: MatSnackBar,
    public signerService: SignerService,
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
