import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
  Inject, ChangeDetectorRef
} from '@angular/core'
import {UserService} from '@services/user/user.service'
import {DisruptiveContractService} from '@services/contract/disruptive-contract.service'
import {APP_CONSTANTS, AppConstantsInterface} from '@constants'
import {
  GrantStatusEnum,
  GrantsVariationType, GrantTypesEnum
} from '@services/static/static.model'
import {DialogComponent} from "@ui/dialog/dialog.component";
import {ProposeGrantComponent} from "@ui/modals/propose-grant/propose-grant.component";
import {translate} from "@ngneat/transloco";
import {submitCallBackProposeArg, submitCallBackRewardArg} from "@ui/dialog/dialog.tokens";
import {MatDialog} from "@angular/material/dialog";
import {CommonContractService} from "@services/contract/common-contract.service";
import {AddRewardComponent} from "@ui/modals/add-reward/add-reward.component";
import {StaticService} from "@services/static/static.service";
import {CommunityContractService} from "@services/contract/community-contract.service";
import {EditGrantComponent} from "@ui/modals/edit-grant/edit-grant.component";

@Component({
  selector: 'ui-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlsComponent implements OnInit {
  grantStatusEnum = GrantStatusEnum

  @Input() public contract!: GrantsVariationType
  @Input() public status: string | null = null
  @Input() public grantId: string | null = null
  @Input() public role: string | null = null
  @Input() public voted: string | null = null
  @Input() public performer: string | null = null

  reportLink = ''

  constructor(
    public userService: UserService,
    public disruptiveContractService: DisruptiveContractService,
    @Inject(APP_CONSTANTS) public readonly constants: AppConstantsInterface,
    private dialog: MatDialog,
    public commonContractService: CommonContractService,
    private cdr: ChangeDetectorRef,
    private staticService: StaticService,
    public communityContractService: CommunityContractService,
  ) {
  }

  ngOnInit() {
  }

  finishVote() {
    this.disruptiveContractService.finishTaskProposalVoting(this.grantId as string)
  }

  startWork() {
    this.disruptiveContractService.startWork(this.grantId as string)
  }

  reject() {
    this.disruptiveContractService.rejectTask(this.grantId as string)
  }

  acceptWorkResult() {
    this.disruptiveContractService.acceptWorkResult(this.grantId as string, this.reportLink)
  }

  finishApplicantsVote() {
    this.disruptiveContractService.finishApplicantsVoting(this.grantId as string)
  }

  addReward() {
   const dialog = this.dialog.open(DialogComponent, {
      data: {
        component: AddRewardComponent,
        params: {
          title: translate('add-reward.title'),
          submitBtnText: translate('modal.btn.propose_grant'),
          grantId: this.grantId,
          submitCallBack: (data: submitCallBackRewardArg) => {
            if (this.grantId) {
                this.disruptiveContractService.addReward(this.grantId, data.reward).subscribe((e)=>{
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
