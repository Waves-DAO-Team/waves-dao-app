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
import {VoteTeamEventInterface} from "@pages/entity-page/entity.interface";

@Component({
  selector: 'ui-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamComponent {

  grantStatusEnum = GrantStatusEnum

  @Input() grant: ContractGrantModel | null = null
  @Input() title: string | null = null

  @Output() openApplyModal = new EventEmitter<boolean>()
  @Output() newSignupEvent = new EventEmitter()
  @Output() newOpenApplyModalEvent = new EventEmitter()
  @Output() newVoteTeamEvent = new EventEmitter<VoteTeamEventInterface>()

  constructor (
    public userService: UserService,
    @Inject(APP_CONSTANTS) public readonly constants: AppConstantsInterface
  ) {}

  isReadyToApply (): boolean {
    return this.grant?.status?.value === this.grantStatusEnum.readyToApply
  }

}
