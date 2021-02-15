import {
  ChangeDetectionStrategy,
  Component, EventEmitter,
  Inject,
  Input, OnDestroy, Output
} from '@angular/core'
import {ContractGrantModel} from '@services/contract/contract.model'
import {UserService} from '@services/user/user.service'
import {APP_CONSTANTS, AppConstantsInterface} from '@constants'
import {GrantStatusEnum} from '@services/static/static.model'
import {TeamsControlsInterface, VoteTeamEventInterface} from '@pages/entity-page/entity.interface'
import {BehaviorSubject, combineLatest, Observable, Subject} from "rxjs";
import {map, takeUntil} from "rxjs/operators";

@Component({
  selector: 'ui-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamComponent implements OnDestroy{

  private grant$: BehaviorSubject<ContractGrantModel> = new BehaviorSubject<ContractGrantModel>({})
  private isHasWinner$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  private inputGrant: ContractGrantModel | null = null

  @Input() set grant(data: ContractGrantModel | null) {
    this.inputGrant = data
    this.preparingStatusData(data)
    if (data) {
      this.grant$.next(data)
    }
  }

  get grant(): ContractGrantModel | null {
    return this.inputGrant
  }

  @Input() titleText: string | null = null
  @Input() isProcess = false
  @Input() applyBtnText: string | null = null
  @Input() teamsControls: TeamsControlsInterface | null = null

  @Output() openApplyModal = new EventEmitter<boolean>()
  @Output() newSignupEvent = new EventEmitter()
  @Output() newOpenApplyModalEvent = new EventEmitter()
  @Output() newVoteTeamEvent = new EventEmitter<VoteTeamEventInterface>()

  public grantStatusEnum = GrantStatusEnum
  private readonly destroyed$ = new Subject()

  public uiStatusesIsRejected$ = combineLatest([this.grant$, this.isHasWinner$])
    .pipe(
      takeUntil(this.destroyed$),
      map(([grant, isWinner]) =>
        isWinner
        && grant.status?.value
        && grant.status?.value === this.grantStatusEnum.teamChosen
        || grant.status?.value === this.grantStatusEnum.workStarted
        || grant.status?.value === this.grantStatusEnum.workFinished
      )
    )

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
    if (data && data.app) {
      data.app.forEach(app => {
        if (app.score) {
          isHasWinnerTemp = true
        }
      })
    }
    this.isHasWinner$.next(isHasWinnerTemp)
  }

  ngOnDestroy (): void {
    this.destroyed$.next(null)
    this.destroyed$.complete()
  }
}
