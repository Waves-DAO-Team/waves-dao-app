import {Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {GrantStatusEnum} from "@services/static/static.model";
import {ContractGrantModel} from "@services/contract/contract.model";
import {VoteTeamEventInterface} from "@pages/entity-page/entity.interface";
import {UserService} from "@services/user/user.service";
import {APP_CONSTANTS, AppConstantsInterface} from "@constants";

@Component({
  selector: 'ui-teams-and-solutions',
  templateUrl: './teams-and-solutions.component.html',
  styleUrls: ['./teams-and-solutions.component.scss']
})
export class TeamsAndSolutionsComponent implements OnChanges {

  grantStatusEnum = GrantStatusEnum

  @Input() grant: ContractGrantModel | null = null
  @Input() titleText: string | null = null
  @Input() applyBtnText: string | null = null

  @Output() openApplyModal = new EventEmitter<boolean>()
  @Output() newSignupEvent = new EventEmitter()
  @Output() newSubmitSolutionEvent = new EventEmitter()
  @Output() newOpenApplyModalEvent = new EventEmitter()
  @Output() newVoteTeamEvent = new EventEmitter<VoteTeamEventInterface>()

  constructor(
    public userService: UserService,
    @Inject(APP_CONSTANTS) public readonly constants: AppConstantsInterface
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.grant && this.grant.app?.length)
      console.log('--- grant ---', this.grant?.app)
  }

  isReadyToApply(): boolean {
    return this.grant?.status?.value === this.grantStatusEnum.readyToApply
  }

}
