import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit
} from '@angular/core'
import {Location} from '@angular/common'
import {ABOUT_PAGE_PROVIDERS, CONTRACT} from './about-page.provider'
import {LoadingWrapperModel} from '@libs/loading-wrapper/loading-wrapper'
import {LinkContentService} from '@services/link-content/link-content.service'
import {filter, map, switchMap, takeUntil, tap} from 'rxjs/operators'
import {GrantsVariationType, GrantTypesEnum} from '@services/static/static.model'
import {API, AppApiInterface} from "@constants";
import {combineLatest, Observable, Subject} from "rxjs";
import {GrantUrl} from "@services/interface";
import {ContractService} from "@services/contract/contract.service";
import {StaticService} from "@services/static/static.service";

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: ABOUT_PAGE_PROVIDERS
})
export class AboutPageComponent implements OnInit, OnDestroy {

  private readonly destroyed$ = new Subject()

  public grantUrl$: Observable<GrantUrl> = combineLatest(
    [this.contractService.entityId$, this.staticService.selectedContact$]
  ).pipe(
    takeUntil(this.destroyed$),
    filter(([entityId, contractType]) => entityId !== undefined && contractType !== undefined),
    map(([entityId, contractType]) => ({entityId, contractType})),
  )

  public readonly mdLink$: Observable<string> = this.grantUrl$
    .pipe(
      map((e): string => e.contractType),
      map((e) => {
        if (e === GrantTypesEnum.disruptive || e === GrantTypesEnum.interhack || e === GrantTypesEnum.web3 || e === GrantTypesEnum.votings) {
          return this.api.about[e]
        } else {
          return ''
        }
      })
    )

  public readonly content$ = combineLatest([this.contract.data$, this.mdLink$])
    .pipe(switchMap(([contractInfo, link]) => this.linkContentService.getContent(link)))

  constructor(
    private readonly contractService: ContractService,
    public staticService: StaticService, // eslint-disable-line
    private readonly location: Location, // eslint-disable-line
    public linkContentService: LinkContentService, // eslint-disable-line
    @Inject(API) public readonly api: AppApiInterface, // eslint-disable-line
    @Inject(CONTRACT) public readonly contract: LoadingWrapperModel<GrantsVariationType> // eslint-disable-line
  ) {
  }

  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back()
  }

  ngOnDestroy(): void {
    this.contract.destroy()
    this.destroyed$.next(null)
    this.destroyed$.complete()
  }
}
