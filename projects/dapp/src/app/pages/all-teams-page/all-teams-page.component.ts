import {Component, Inject, OnDestroy} from '@angular/core'
import {Location} from '@angular/common'
import {LoadingWrapperModel} from '@libs/loading-wrapper/loading-wrapper'
import {ContractGrantAppModel, ContractGrantModel,} from '@services/contract/contract.model'
import {filter, map, takeUntil, tap} from 'rxjs/operators'
import {BehaviorSubject, combineLatest, Observable, Subject} from 'rxjs'
import {ALL_TEAM, ALL_TEAM_PAGE_PROVIDERS} from './all-teams-page-routing.providers'
import {ActivatedRoute} from '@angular/router'
import {GrantUrl, IScore} from '@services/interface'
import {GrantTypesEnum} from '@services/static/static.model'
import {StaticService} from "@services/static/static.service";
import {ContractService} from "@services/contract/contract.service";

@Component({
  selector: 'app-all-teams-page',
  templateUrl: './all-teams-page.component.html',
  styleUrls: ['./all-teams-page.component.scss'],
  providers: ALL_TEAM_PAGE_PROVIDERS
})
export class AllTeamsPageComponent implements OnDestroy {

  private readonly destroyed$ = new Subject()

  public grantUrl$: Observable<GrantUrl> = combineLatest(
    [this.contractService.entityId$, this.staticService.selectedContact$]
  ).pipe(
    takeUntil(this.destroyed$),
    filter(([entityId, contractType]) => entityId !== undefined && contractType !== undefined),
    map(([entityId, contractType]) => {return { entityId, contractType}}),
  )

  public title$: Observable<string> = this.entity.data$
    .pipe(
      takeUntil(this.destroyed$),
      map((data: ContractGrantModel) => data?.title?.value || ''),
    )

  public teams$: Observable<IScore.IUnit[]> = this.entity.data$
    .pipe(
      takeUntil(this.destroyed$),
      filter((data: ContractGrantModel) => data !== null && data !== undefined),
      filter((data: ContractGrantModel) => data.app !== null && data.app !== undefined),
      map((data: ContractGrantModel): ContractGrantAppModel[] => data.app || []),
      map((apps: ContractGrantAppModel[]) => {
        const res: IScore.IUnit[] = []

        apps.forEach(app => {

          const grantType: GrantTypesEnum = app.score && app.score.applicant && app.score.applicant.value
            ? GrantTypesEnum.interhack
            : GrantTypesEnum.disruptive

          const score = grantType === GrantTypesEnum.interhack
            ? (app?.score?.applicant?.value || 0)
            : (app?.score?.value || 0)

          const unit: IScore.IUnit = {
            isWinner: app.process?.value === 'winner' || app.process?.value === 'work_finished' ? true : false,
            isWinnerIcon: true,
            name: app.name.value,
            solutionLink: null,
            status: {
              isSolution: grantType === GrantTypesEnum.interhack && app?.solution?.value ? true : false,
              isRejected: score < 1,
              isApprove: app.process !== undefined
            },
            square: {
              score: grantType === GrantTypesEnum.interhack
                ? (app?.score?.applicant?.value || 0)
                : (app?.score?.value || 0),
              id: app.id.value,
              isCanVote: false,
              isShowResult: false,
            },
            teamLink: app.link.value
          }

          res.push(unit)

        })

        return res
      })
    )

  constructor(
    private readonly contractService: ContractService,
    public staticService: StaticService, // eslint-disable-line
    private route: ActivatedRoute, // eslint-disable-line
    private readonly location: Location, // eslint-disable-line
    @Inject(ALL_TEAM) public entity: LoadingWrapperModel<ContractGrantModel>, // eslint-disable-line
  ) {}

  goBack(): void {
    this.location.back()
  }

  ngOnDestroy(): void {
    this.destroyed$.next(null)
    this.destroyed$.complete()
  }

}
