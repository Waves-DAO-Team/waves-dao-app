import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core'
import { ContractGrantModel } from '@services/contract/contract.model'
import {GrantStatusEnum, GrantsVariationType} from '@services/static/static.model'
import {DisruptiveContractService} from "@services/contract/disruptive-contract.service";
import {take} from "rxjs/operators";
import {translate} from "@ngneat/transloco";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "@services/user/user.service";
import {SignerService} from "@services/signer/signer.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "@ui/dialog/dialog.component";
import {ApplyComponent} from "@ui/modals/apply/apply.component";
import {submitCallBackApplyArg, submitCallBackRewardArg} from "@ui/dialog/dialog.tokens";
import {TemplateComponentAbstract, VoteTeamEventInterface} from "@pages/entity-page/entity.interface";
import {AddRewardComponent} from "@ui/modals/add-reward/add-reward.component";
import {EditGrantComponent} from "@ui/modals/edit-grant/edit-grant.component";

@Component({
  selector: 'app-default-template',
  templateUrl: './default-template.component.html',
  styleUrls: ['./default-template.component.scss']
})
export class DefaultTemplateComponent implements TemplateComponentAbstract{

  @Input() public readonly grant: ContractGrantModel = {}
  @Input() public readonly contract!: GrantsVariationType

  constructor (
    private dialog: MatDialog,
    public disruptiveContractService: DisruptiveContractService,
    private snackBar: MatSnackBar,
    public signerService: SignerService,
    private cdr: ChangeDetectorRef,
    public userService: UserService
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

  finishVote() {
    this.disruptiveContractService.finishTaskProposalVoting(this.grant?.id as string)
  }

  startWork(): void {
    this.disruptiveContractService.startWork(this.grant?.id as string)
  }

  reject(): void {
    this.disruptiveContractService.rejectTask(this.grant?.id as string)
  }

  acceptWorkResult(reportLink: string): void {
    this.disruptiveContractService.acceptWorkResult(this.grant?.id as string, reportLink)
  }

  finishApplicantsVote(): void {
    this.disruptiveContractService.finishApplicantsVoting(this.grant?.id as string)
  }

  addReward(): void {
    const dialog = this.dialog.open(DialogComponent, {
      data: {
        component: AddRewardComponent,
        params: {
          title: translate('add-reward.title'),
          submitBtnText: translate('modal.btn.propose_grant'),
          grantId: this.grant?.id,
          submitCallBack: (data: submitCallBackRewardArg) => {
            if (this.grant?.id) {
              this.disruptiveContractService.addReward(this.grant?.id, data.reward).subscribe((e)=>{
                dialog.close()
                this.cdr.markForCheck()
              })
            }
          }
        }
      }
    })
  }

  editGrant() {
    const dialog = this.dialog.open(DialogComponent, {
      data: {
        component: EditGrantComponent,
        params: {
          title: translate('edit_grant.title'),
          submitBtnText: translate('edit_grant.btn.edit'),
          submitCallBack: (data: submitCallBackRewardArg) => {
            // TODO: нужен метод, на https://waves-dapp.com/3Mxk4Jmjd8SdE2MojSXsUQ8LVYM8vRzmFSA нет
            // this.disruptiveContractService.addReward(this.grantId, data.reward).subscribe((e)=>{
            dialog.close()
            this.cdr.markForCheck()
            // })
          }
        }
      }
    })
  }

}
