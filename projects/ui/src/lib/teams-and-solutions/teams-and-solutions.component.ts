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
export class TeamsAndSolutionsComponent {

  grantStatusEnum = GrantStatusEnum
  templateConditions = {
    grantStatus: this.grantStatusEnum.noStatus.toString(),
    voteType: 'team',
    isApplyBtn: false,
    isSubmitSolutionBtn: false,

  }


  GSgrant: ContractGrantModel | null = null

  @Input() set grant(grant: ContractGrantModel | null) {
    this.GSgrant = grant
    if (grant && grant.status && grant.status.value) {
      this.templateConditions.grantStatus = grant.status.value.toString()
      if (
        grant.status.value === this.grantStatusEnum.workStarted
        || grant.status.value === this.grantStatusEnum.proposed
        || grant.status.value === this.grantStatusEnum.readyToApply
        || grant.status.value === this.grantStatusEnum.workStarted
      ) {
        this.templateConditions.voteType = 'team'
      } else {
        this.templateConditions.voteType = 'solution'
      }
      if (grant.status.value === this.grantStatusEnum.readyToApply) {
        this.templateConditions.isApplyBtn = true
      } else {
        this.templateConditions.isApplyBtn = false
      }
      if (grant.status.value === this.grantStatusEnum.workStarted) {
        this.templateConditions.isSubmitSolutionBtn = true
      } else {
        this.templateConditions.isSubmitSolutionBtn = false
      }
    }
  }

  get grant() {
    return this.GSgrant
  }

  @Input() titleText: string | null = null
  @Input() applyBtnText: string | null = null

  @Output() openApplyModal = new EventEmitter<boolean>()
  @Output() newSignupEvent = new EventEmitter()
  @Output() newSubmitSolutionEvent = new EventEmitter()
  @Output() newOpenApplyModalEvent = new EventEmitter()
  @Output() newVoteTeamEvent = new EventEmitter<VoteTeamEventInterface>()
  @Output() newVoteForSolutionEvent = new EventEmitter<VoteTeamEventInterface>()

  constructor(
    public userService: UserService,
    @Inject(APP_CONSTANTS) public readonly constants: AppConstantsInterface
  ) {
  }

  isReadyToApply(): boolean {
    return this.grant?.status?.value === this.grantStatusEnum.readyToApply
  }

}
