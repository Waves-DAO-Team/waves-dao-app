import {
  ChangeDetectionStrategy,
  Component, EventEmitter,
  Inject,
  Input, Output
} from '@angular/core'
import { ContractGrantModel } from '@services/contract/contract.model'
import { UserService } from '@services/user/user.service'
import { APP_CONSTANTS, AppConstantsInterface } from '@constants'
import { grantStatusEnum } from '@services/static/static.model'
import { TeamsControlsInterface, VoteTeamEventInterface } from '@pages/entity-page/entity.interface'

@Component({
  selector: 'ui-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamComponent {
  @Input() grant: ContractGrantModel | null = null
  @Input() titleText: string | null = null
  @Input() applyBtnText: string | null = null
  @Input() teamsControls: TeamsControlsInterface | null = null

  @Output() openApplyModal = new EventEmitter<boolean>()
  @Output() newSignupEvent = new EventEmitter()
  @Output() newOpenApplyModalEvent = new EventEmitter()
  @Output() newVoteTeamEvent = new EventEmitter<VoteTeamEventInterface>()

  public grantStatusEnum = grantStatusEnum

  constructor (
    public userService: UserService,
    @Inject(APP_CONSTANTS) public readonly constants: AppConstantsInterface
  ) {}

  isReadyToApply (): boolean {
    return this.grant?.status?.value === this.grantStatusEnum.readyToApply
  }
}
