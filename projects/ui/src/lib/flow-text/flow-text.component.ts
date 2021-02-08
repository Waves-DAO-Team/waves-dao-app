import {Component, Input, OnDestroy } from '@angular/core'
import { map, takeUntil } from 'rxjs/operators'
import {ActivatedRoute} from '@angular/router'
import {GrantTypesEnum} from '@services/static/static.model'
import {BehaviorSubject, combineLatest, Observable, Subject} from 'rxjs'
import {translate} from '@ngneat/transloco'
import {ContractGrantModel} from '@services/contract/contract.model'

@Component({
  selector: 'ui-flow-text',
  templateUrl: './flow-text.component.html',
  styleUrls: ['./flow-text.component.scss']
})
export class FlowTextComponent implements OnDestroy {

  @Input() isShowStatus = false
  @Input() isShowFlow = false
  private grant$: BehaviorSubject<ContractGrantModel> = new BehaviorSubject<ContractGrantModel>({})

  @Input() set grant (data: ContractGrantModel) {
    if (data && data.id) {
      this.grant$.next(data)
    }
  }

  private readonly destroyed$ = new Subject()
  public grantUrl$: Observable<GrantTypesEnum> = this.route.paramMap
    .pipe(
      takeUntil(this.destroyed$),
      map((e) => (e.get('contractType') as GrantTypesEnum | null) || GrantTypesEnum.disruptive),
    )
  private status$: BehaviorSubject<string> = new BehaviorSubject<string>('')
  public content$ = combineLatest([this.grantUrl$, this.status$, this.grant$])
    .pipe(
      takeUntil(this.destroyed$),
      map(
        ([grantType, status, grant]) => {
          const data = {
            status: status ? translate('listing.status.' + status) : '',
            flow: '',
          }
          if (grantType === GrantTypesEnum.disruptive || grantType === GrantTypesEnum.web3) {
            data.flow = translate('flow.disruptive.' + status)
          } else {
            data.flow = translate('flow.interhack.' + status)
          }
          if (grant && grant.id)
            {data.flow = this.prepareData(data.flow, grant)}
          return data
        }
      )
    )

  @Input() set status (data: string) {
    this.status$.next(data)
  }

  constructor (public route: ActivatedRoute) {
  }

  ngOnDestroy (): void {
    this.destroyed$.next(null)
  }

  private prepareData (flow: string, grant: ContractGrantModel): string {
    // <voteScore> <votesAmount> <performerName> <reportLink> <winnerName>
    let voteScore = 0
    let votesAmount = 0
    if (grant.voted) {
      for (const key of Object.keys(grant.voted)) {
        votesAmount++
        voteScore += parseInt(grant.voted[key].value, 10)
      }
    }
    let performerName = ''
    if (grant.app) {
      grant.app.forEach( app => {
        if (app.process && app.name && app.name.value) {
          performerName = app.name.value
        }
      })
    }
    let reportLink = ''
    if (grant.app) {
      grant.app.forEach( app => {
        if (app.report && app.report.value) {
          reportLink = app.report.value
        }
      })
    }
    flow = flow.replace('<voteScore>', voteScore.toString())
    flow = flow.replace('<votesAmount>', votesAmount.toString())
    flow = flow.replace('<performerName>', performerName)
    flow = flow.replace('<reportLink>', reportLink)
    flow = flow.replace('<winnerName>', performerName)
    return flow
  }

}
