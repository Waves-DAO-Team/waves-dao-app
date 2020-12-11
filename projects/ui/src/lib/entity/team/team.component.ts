import {
  ChangeDetectionStrategy,
  Component, EventEmitter,
  Inject,
  Input,
  OnInit, Output
} from '@angular/core'
import { ContractGrantModel } from '@services/contract/contract.model'
import { UserService } from '@services/user/user.service'
import { DisruptiveContractService } from '@services/contract/disruptive-contract.service'
import { APP_CONSTANTS, AppConstantsInterface } from '@constants'
import { take } from 'rxjs/operators'
import { translate } from '@ngneat/transloco'
import { SignerService } from '@services/signer/signer.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { DialogComponent } from '@ui/dialog/dialog.component'
import { ApplyComponent } from '@ui/modals/apply/apply.component'
import { MatDialog } from '@angular/material/dialog'
import { submitCallBackApplyArg } from '@ui/dialog/dialog.tokens'
import { GrantStatusEnum } from '@services/static/static.model'

@Component({
  selector: 'ui-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamComponent {
  grantStatusEnum = GrantStatusEnum
  @Input() grant: ContractGrantModel | null = null

  @Output() openApplyModal = new EventEmitter<boolean>()
  @Output() newSignupEvent = new EventEmitter()
  @Output() newOpenApplyModalEvent = new EventEmitter()

  constructor (

    public disruptiveContractService: DisruptiveContractService,
    public userService: UserService,
    @Inject(APP_CONSTANTS) public readonly constants: AppConstantsInterface
  ) {
  }

  voteTeam (voteValue: 'like' | 'dislike', teamIdentifier: string) {
    if (this.grant?.status?.value === this.grantStatusEnum.readyToApply) {
      this.disruptiveContractService.voteForApplicant(this.grant?.id as string, teamIdentifier, voteValue)
    }
  }

  isReadyToApply (): boolean {
    return this.grant?.status?.value === this.grantStatusEnum.readyToApply
  }

  isDAO (): boolean {
    return this.userService.data.getValue().roles.isDAO
  }

}
