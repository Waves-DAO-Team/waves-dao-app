import {
  ChangeDetectionStrategy,
  Component, EventEmitter,
  Inject,
  Input, Output
} from '@angular/core'
import {ContractGrantModel} from '@services/contract/contract.model'
import {UserService} from '@services/user/user.service'
import {APP_CONSTANTS, AppConstantsInterface} from '@constants'
import {GrantStatusEnum} from '@services/static/static.model'
import {TeamsControlsInterface, VoteTeamEventInterface} from '@pages/entity-page/entity.interface'

@Component({
  selector: 'ui-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamComponent {

  private inputGrant: ContractGrantModel | null = null

  @Input() set grant(data: ContractGrantModel | null) {
    this.inputGrant = data
    this.preparingStatusData(data)
  }

  get grant(): ContractGrantModel | null {
    return this.inputGrant
  }

  @Input() titleText: string | null = null
  @Input() applyBtnText: string | null = null
  @Input() teamsControls: TeamsControlsInterface | null = null

  @Output() openApplyModal = new EventEmitter<boolean>()
  @Output() newSignupEvent = new EventEmitter()
  @Output() newOpenApplyModalEvent = new EventEmitter()
  @Output() newVoteTeamEvent = new EventEmitter<VoteTeamEventInterface>()

  public grantStatusEnum = GrantStatusEnum

  public isHasWinner = false

  constructor(
    public userService: UserService, // eslint-disable-line
    @Inject(APP_CONSTANTS) public readonly constants: AppConstantsInterface // eslint-disable-line
  ) {
  }

  isReadyToApply(): boolean {
    return this.grant?.status?.value === this.grantStatusEnum.readyToApply
  }

  private preparingStatusData(data: ContractGrantModel | null) {
    let isHasWinnerTemp = false
    if (data && data.app)
      data.app.forEach(app => {
        if (app.score)
          isHasWinnerTemp = true
      })
    this.isHasWinner = isHasWinnerTemp
  }
}
