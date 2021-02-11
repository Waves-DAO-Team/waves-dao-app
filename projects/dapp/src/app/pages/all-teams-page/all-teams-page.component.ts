import {Component, Inject, OnDestroy} from '@angular/core'
import {Location} from '@angular/common'
import {LoadingWrapperModel} from '@libs/loading-wrapper/loading-wrapper'
import {ContractGrantAppModel, ContractGrantModel,} from '@services/contract/contract.model'
import {filter, map, takeUntil} from 'rxjs/operators'
import {Observable, Subject} from 'rxjs'
import {ALL_TEAM, ALL_TEAM_PAGE_PROVIDERS} from './all-teams-page-routing.providers'
import {ActivatedRoute} from '@angular/router'
import {GrantUrl, IScore} from '@services/interface'
import {GrantTypesEnum} from '@services/static/static.model'

@Component({
  selector: 'app-all-teams-page',
  templateUrl: './all-teams-page.component.html',
  styleUrls: ['./all-teams-page.component.scss'],
  providers: ALL_TEAM_PAGE_PROVIDERS
})
export class AllTeamsPageComponent implements OnDestroy {

  private readonly destroyed$ = new Subject()

  public grantUrl$: Observable<GrantUrl> = this.route.paramMap
    .pipe(
      takeUntil(this.destroyed$),
      map((e): GrantUrl => ({
        contractType: e.get('contractType') || '',
        entityId: e.get('entityId') || ''
      }))
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

        apps.forEach( app => {
          console.log('+++', app)

          const grantType: GrantTypesEnum = app.score && app.score.applicant && app.score.applicant.value
            ? GrantTypesEnum.interhack
            : GrantTypesEnum.disruptive

          const score = grantType === GrantTypesEnum.interhack
            ? (app?.score?.applicant?.value || 0)
            : (app?.score?.value || 0)

          const unit: IScore.IUnit = {
            isWinner: app.process?.value === 'winner' || app.process?.value === 'work_finished'? true : false,
            isWinnerIcon: true, // TODO:
            name: app.name.value,
            solutionLink: null, // TODO:
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
              isShowResult: false, // TODO:
            },
            teamLink: app.link.value
          }

          res.push(unit)

        })

        return res
      })
    )

  constructor (
    private route: ActivatedRoute, // eslint-disable-line
    private readonly location: Location, // eslint-disable-line
    @Inject(ALL_TEAM) public entity: LoadingWrapperModel<ContractGrantModel>, // eslint-disable-line
  ) {
  }

  goBack (): void {
    this.location.back()
  }

  ngOnDestroy (): void {
    this.destroyed$.next(null)
    this.destroyed$.complete()
  }

}
