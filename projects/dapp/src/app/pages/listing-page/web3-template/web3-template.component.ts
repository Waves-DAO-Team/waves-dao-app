import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit
} from '@angular/core'
import { UserDataInterface } from '@services/user/user.interface'
import { AppApiInterface, AppConstantsInterface } from '@constants'
import { MatDialog } from '@angular/material/dialog'
import { DialogComponent } from '@ui/dialog/dialog.component'
import { ProposeGrantComponent } from '@ui/modals/propose-grant/propose-grant.component'
import { CommunityContractService } from '@services/contract/community-contract.service'
import { translate } from '@ngneat/transloco'
import { SubmitCallBackProposeArg } from '@ui/dialog/dialog.tokens'
import { GrantsVariationType } from '@services/static/static.model'

@Component({
  selector: 'app-web3-template',
  templateUrl: './web3-template.component.html',
  styleUrls: ['./web3-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Web3TemplateComponent implements OnInit {
  @Input() public readonly user!: UserDataInterface

  @Input() public readonly contract!: GrantsVariationType

  @Input() public readonly constants!: AppConstantsInterface

  @Input() public readonly api!: AppApiInterface

  constructor (
    private readonly dialog: MatDialog,
    public communityContractService: CommunityContractService,
    private readonly cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit (): void {
  }

  onProposeGrant (): void {
    this.dialog.open(DialogComponent, {
      data: {
        component: ProposeGrantComponent,
        params: {
          title: translate('modal.texts.propose_web_grant'),
          submitBtnText: translate('modal.btn.propose_grant'),
          submitCallBack: (data: SubmitCallBackProposeArg) => {
            this.communityContractService.addTask(data.name, data.link)
              .subscribe(() => {
                this.cdr.markForCheck()
              })
          }
        }
      }
    })
  }
}
