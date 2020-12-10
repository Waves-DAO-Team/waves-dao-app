import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core'
import { UserDataInterface } from '@services/user/user.interface'
import { AppApiInterface, AppConstantsInterface } from '@constants'
import { DialogComponent } from '@ui/dialog/dialog.component'
import { ProposeGrantComponent } from '@ui/modals/propose-grant/propose-grant.component'
import { MatDialog } from '@angular/material/dialog'
import { CommonContractService } from '@services/contract/common-contract.service'
import { translate } from '@ngneat/transloco'
import { submitCallBackProposeArg } from '@ui/dialog/dialog.tokens'
import { GrantsVariationType } from '@services/static/static.model'

@Component({
  selector: 'app-default-template',
  templateUrl: './default-template.component.html',
  styleUrls: ['./default-template.component.scss']
})
export class DefaultTemplateComponent implements OnInit {
  @Input() public readonly user!: UserDataInterface;

  @Input() public readonly contract!: GrantsVariationType;

  @Input() public readonly constants!: AppConstantsInterface;

  @Input() public readonly api!: AppApiInterface;

  constructor (
      private dialog: MatDialog,
      public commonContractService: CommonContractService,
      private cdr: ChangeDetectorRef
  ) { }

  ngOnInit (): void {
  }

  onProposeGrant () {
    this.dialog.open(DialogComponent, {
      data: {
        component: ProposeGrantComponent,
        params: {
          title: translate('modal.texts.propose_grant'),
          submitBtnText: translate('modal.btn.propose_grant'),
          submitCallBack: (data: submitCallBackProposeArg) => {
            this.commonContractService.addTask(data.name, data.link)
              .subscribe(() => {
                this.cdr.markForCheck()
              })
          }
        }
      }
    })
  }
}
