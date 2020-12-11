import { Component, Input, OnInit } from '@angular/core'
import { ContractGrantModel } from '@services/contract/contract.model'
import {GrantStatusEnum, GrantsVariationType} from '@services/static/static.model'
import {CommonContractService} from "@services/contract/common-contract.service";
import {DisruptiveContractService} from "@services/contract/disruptive-contract.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SignerService} from "@services/signer/signer.service";
import {take} from "rxjs/operators";
import {translate} from "@ngneat/transloco";
import {DialogComponent} from "@ui/dialog/dialog.component";
import {ApplyComponent} from "@ui/modals/apply/apply.component";
import {submitCallBackApplyArg} from "@ui/dialog/dialog.tokens";
import {MatDialog} from "@angular/material/dialog";
import {VoteTeamEventInterface} from "@pages/entity-page/entity.interface";

@Component({
  selector: 'app-web3-template',
  templateUrl: './web3-template.component.html',
  styleUrls: ['./web3-template.component.scss']
})
export class Web3TemplateComponent {

  @Input() public readonly grant: ContractGrantModel = {}
  @Input() public readonly contract!: GrantsVariationType

  constructor (
    private dialog: MatDialog,
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

  openApplyModal () {
    this.dialog.open(DialogComponent, {
      data: {
        component: ApplyComponent,
        params: {
          grant: this.grant,
          submitCallBack: (data: submitCallBackApplyArg) => {
            this.disruptiveContractService.applyForTask(data.id, data.team, data.link)
              .pipe(take(1))
              .subscribe()
          }
        }
      }
    })
  }

  voteTeam ($event: VoteTeamEventInterface) {
    if (this.grant?.status?.value === GrantStatusEnum.readyToApply) {
      this.disruptiveContractService.voteForApplicant(this.grant?.id as string, $event.teamIdentifier, $event.voteValue)
    }
  }

}
