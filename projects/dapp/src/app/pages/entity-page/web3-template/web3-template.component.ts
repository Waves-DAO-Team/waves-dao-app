import { ChangeDetectorRef, Component, Input } from '@angular/core'
import { ContractGrantModel } from '@services/contract/contract.model'
import { GrantStatusEnum, GrantsVariationType } from '@services/static/static.model'
import { DisruptiveContractService } from '@services/contract/disruptive-contract.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { SignerService } from '@services/signer/signer.service'
import { take } from 'rxjs/operators'
import { translate } from '@ngneat/transloco'
import { DialogComponent } from '@ui/dialog/dialog.component'
import { ApplyComponent } from '@ui/modals/apply/apply.component'
import { SubmitCallBackApplyArg, SubmitCallBackRewardArg } from '@ui/dialog/dialog.tokens'
import { MatDialog } from '@angular/material/dialog'
import { TemplateComponentAbstract, VoteTeamEventInterface } from '@pages/entity-page/entity.interface'
import { AddRewardComponent } from '@ui/modals/add-reward/add-reward.component'
import { AddTaskDetailsComponent } from '@ui/modals/add-task-details/add-task-details.component'
import { CommunityContractService } from '@services/contract/community-contract.service'
import { UserService } from '@services/user/user.service'

@Component({
  selector: 'app-web3-template',
  templateUrl: './web3-template.component.html',
  styleUrls: ['./web3-template.component.scss']
})
export class Web3TemplateComponent implements TemplateComponentAbstract {
  @Input() public readonly grant: ContractGrantModel = {}
  @Input() public readonly contract!: GrantsVariationType

  constructor (
    private dialog: MatDialog,
    public disruptiveContractService: DisruptiveContractService,
    public communityContractService: CommunityContractService,
    private snackBar: MatSnackBar,
    public signerService: SignerService,
    private cdr: ChangeDetectorRef,
    public userService: UserService
  ) {
  }

  vote (value: 'like' | 'dislike'): void {
    const id = this.grant.id || ''
    this.disruptiveContractService.voteForTaskProposal(id, value).subscribe()
  }

  signup (): void {
    this.signerService.login()
      .pipe(take(1))
      .subscribe(() => {
      }, (error) => {
        this.snackBar.open(error, translate('messages.ok'))
      })
  }

  openApplyModal (): void {
    this.dialog.open(DialogComponent, {
      data: {
        component: ApplyComponent,
        params: {
          grant: this.grant,
          submitCallBack: (data: SubmitCallBackApplyArg) => {
            this.disruptiveContractService.applyForTask(data.id, data.team, data.link)
              .pipe(take(1))
              .subscribe()
          }
        }
      }
    })
  }

  voteTeam ($event: VoteTeamEventInterface): void {
    if (this.grant?.status?.value === GrantStatusEnum.readyToApply) {
      this.disruptiveContractService.voteForApplicant(this.grant?.id as string, $event.teamIdentifier, $event.voteValue).subscribe()
    }
  }

  finishVote (): void {
    this.disruptiveContractService.finishTaskProposalVoting(this.grant?.id as string).subscribe()
  }

  startWork (): void {
    this.disruptiveContractService.startWork(this.grant?.id as string).subscribe()
  }

  reject (): void {
    this.disruptiveContractService.rejectTask(this.grant?.id as string).subscribe()
  }

  acceptWorkResult (reportLink: string): void {
    this.disruptiveContractService.acceptWorkResult(this.grant?.id as string, reportLink).subscribe()
  }

  finishApplicantsVote (): void {
    this.disruptiveContractService.finishApplicantsVoting(this.grant?.id as string).subscribe()
  }

  addReward (): void {
    const dialog = this.dialog.open(DialogComponent, {
      data: {
        component: AddRewardComponent,
        params: {
          title: translate('add-reward.title'),
          submitBtnText: translate('modal.btn.propose_grant'),
          grantId: this.grant?.id,
          submitCallBack: (data: SubmitCallBackRewardArg) => {
            if (this.grant?.id) {
              this.disruptiveContractService.addReward(this.grant?.id, data.reward).subscribe((e) => {
                dialog.close()
                this.cdr.markForCheck()
              })
            }
          }
        }
      }
    })
  }

  addTaskDetails () {
    const dialog = this.dialog.open(DialogComponent, {
      data: {
        component: AddTaskDetailsComponent,
        params: {
          title: translate('modal.texts.add_task_details'),
          submitBtnText: translate('modal.btn.apply'),
          submitCallBack: (data: SubmitCallBackRewardArg) => {
            if (this.grant.id) {
              this.communityContractService.addTaskDetails(this.grant.id, data.reward).subscribe((e) => {
                dialog.close()
                this.cdr.markForCheck()
                // State check failed. Reason: Transaction sent from smart account.
                // Requires 400000 extra fee.. Fee for InvokeScriptTransaction (500000 in WAVES)
                // does not exceed minimal value of 900000 WAVES.

              // { assetId: 'WAVES', amount: reward }
              })
            }
          }
        }
      }
    })
  }

  initTaskVoting () {
    if (this.grant.id) {
      this.communityContractService.initTaskVoting(this.grant.id).subscribe((e) => {
        this.cdr.markForCheck()
      })
    }
  }
}
