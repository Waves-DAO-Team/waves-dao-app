import {Component, Inject} from '@angular/core'
import {Location} from '@angular/common'
import {LoadingWrapperModel} from '@libs/loading-wrapper/loading-wrapper'
import {ContractGrantModel, TeamsScoreLinkModel} from '@services/contract/contract.model'
import {filter, map} from 'rxjs/operators'
import {Observable} from 'rxjs'
import {ALL_TEAM, ALL_TEAM_PAGE_PROVIDERS} from './all-teams-page-routing.providers'
import {ActivatedRoute} from '@angular/router'
import {IUrl} from "@ui/all-teams-btn/all-teams-btn.interface";

@Component({
  selector: 'app-all-teams-page',
  templateUrl: './all-teams-page.component.html',
  styleUrls: ['./all-teams-page.component.scss'],
  providers: ALL_TEAM_PAGE_PROVIDERS
})
export class AllTeamsPageComponent {


  public grantUrl$: Observable<IUrl> = this.route.paramMap
    .pipe(
      map( e => {
        let res: IUrl = {
          contractType: e.get('contractType') || '',
          entityId: e.get('entityId') || ''
        }
        return res
      })
    )

  public title$: Observable<string> = this.entity.data$
    .pipe(
      filter((data) => data.title !== undefined && data.title.value !== undefined),
      map((data) => data?.title?.value || ''),
    )

  public teams$: Observable<TeamsScoreLinkModel[]> = this.entity.data$
    .pipe(
      filter((data) => data !== undefined && data.app !== undefined),
      map((data) => data.app),
      map((data) => {
        const res: TeamsScoreLinkModel[] = []
        if (data) {
          data.forEach((d) => {
            let score: string | number = 0
            if (d.score && d.score.applicant && d.score.applicant.value) { // interhack
              score = d.score.applicant.value
            } else if (d.score && d.score.value) { // disruptive
              score = d.score.value
            }
            res.push({
              name: d.name.value,
              link: d.link.value,
              score
            })
          })
        }
        return res
      }),
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

}
