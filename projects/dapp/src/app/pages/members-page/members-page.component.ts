import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject
} from '@angular/core'
import { Location } from '@angular/common'
import { UserService } from '@services/user/user.service'
import { API, APP_CONSTANTS, AppApiInterface, AppConstantsInterface } from '@constants'
import { StaticService } from '@services/static/static.service'
import { DialogComponent } from '@ui/dialog/dialog.component'
import { SubmitCallBackAddMemberArg } from '@ui/dialog/dialog.tokens'
import { MatDialog } from '@angular/material/dialog'
import { AddMemberComponent } from '@ui/modals/add-member/add-member.component'
import { translate } from '@ngneat/transloco'
import { CommonContractService } from '@services/contract/common-contract.service'

@Component({
  selector: 'app-members-page',
  templateUrl: './members-page.component.html',
  styleUrls: ['./members-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MembersPageComponent {
  public readonly user$ = this.userService.data

  constructor (
    private readonly commonContractService: CommonContractService,
    private readonly dialog: MatDialog,
    private readonly location: Location,
    public userService: UserService,
    public staticService: StaticService,
    public cdr: ChangeDetectorRef,
    @Inject(API) public readonly api: AppApiInterface,
    @Inject(APP_CONSTANTS) public readonly constants: AppConstantsInterface
  ) {
  }

  goBack (): void {
    this.location.back()
  }

  openAddDAOModal (): void {
    const dialog = this.dialog.open(DialogComponent, {
      data: {
        component: AddMemberComponent,
        params: {
          title: translate('modal.texts.add_member'),
          submitBtnText: translate('modal.btn.apply'),
          submitCallBack: (data: SubmitCallBackAddMemberArg) => {
            this.commonContractService.addDAOMember(data.address)
              .subscribe(() => {
                dialog.close()
              })
          }
        }
      }
    })
  }

  openAddWGModal (): void {
    const dialog = this.dialog.open(DialogComponent, {
      data: {
        component: AddMemberComponent,
        params: {
          title: translate('modal.texts.add_member'),
          submitBtnText: translate('modal.btn.apply'),
          submitCallBack: (data: SubmitCallBackAddMemberArg) => {
            this.commonContractService.addGroupMember(data.address)
              .subscribe(() => {
                dialog.close()
              })
          }
        }
      }
    })
  }
}
