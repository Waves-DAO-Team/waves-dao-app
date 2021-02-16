import {Component, OnDestroy, OnInit} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {filter, map, takeUntil} from 'rxjs/operators'
import {combineLatest, Observable, Subject} from 'rxjs'
import {GrantUrl} from '@services/interface'
import {ContractService} from "@services/contract/contract.service";
import {StaticService} from "@services/static/static.service";

@Component({
  selector: 'ui-all-teams-btn',
  templateUrl: './all-teams-btn.component.html',
  styleUrls: ['./all-teams-btn.component.scss']
})
export class AllTeamsBtnComponent implements OnDestroy {

  private readonly destroyed$ = new Subject()

  public grantUrl$: Observable<GrantUrl> = combineLatest(
    [this.contractService.entityId$, this.staticService.selectedContact$]
  ).pipe(
    takeUntil(this.destroyed$),
    filter(([entityId, contractType]) => entityId !== undefined && contractType !== undefined),
    map(([entityId, contractType]) => {return { entityId, contractType}}),
  )

  constructor (
    private readonly contractService: ContractService,
    public staticService: StaticService, // eslint-disable-line
    public route: ActivatedRoute
  ) { }

  ngOnDestroy(): void {
    this.destroyed$.next(null)
    this.destroyed$.complete()
  }
}
