import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject,
  Input,
  OnDestroy,
} from '@angular/core'
import {GRANTS, GRANTS_PROVIDERS} from './listing.providers'
import {
  ContractGrantModel, ContractGrantRawModel,
} from '@services/contract/contract.model'
import {LoadingWrapperModel} from '@libs/loading-wrapper/loading-wrapper'
import {
  API,
  APP_CONSTANTS,
  AppApiInterface,
  AppConstantsInterface
} from '@constants'
import {UserService} from '@services/user/user.service'
import {map, publishReplay, refCount} from 'rxjs/operators'
import {ContractService} from '@services/contract/contract.service'
import {TeamService} from '@services/team/team.service'
import {BehaviorSubject, combineLatest, Observable} from 'rxjs'
import {translate} from '@ngneat/transloco'
import {
  GrantStatusEnum,
  GrantsVariationType,
} from '@services/static/static.model'
import {ActivatedRoute} from '@angular/router'
import { Async } from '@libs/decorators/async-input.decorator'

@Component({
  selector: 'ui-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: GRANTS_PROVIDERS
})

export class ListingComponent implements OnDestroy {
  statusPriority = []

  @Input() public type: 'default' | 'active' | undefined

  @Async() @Input('contract') public readonly contract$!: Observable<GrantsVariationType>

  public readonly grantsVariationActive = '1'
  public readonly grantStatusEnum = GrantStatusEnum
  public selectedTagName$ = new BehaviorSubject<string>('all')

  public readonly listGrantStatuses$: Observable<string[]> = this.grants.data$.pipe(
    map((grants: ContractGrantRawModel[]): string[] =>
        grants instanceof Array ? Object.values(
            grants.reduce<{[s: string]: string}>(
                (origin, grant) => ({
                  ...origin,
                  ...(grant?.status?.value === undefined
                    ? {[GrantStatusEnum.noStatus]: GrantStatusEnum.noStatus}
                    : {[grant?.status?.value]: grant?.status?.value})
                }), {})) : []),
    map((list: string[]) => list.length > 0 ? ['all'].concat(list as []) : list.length === 1 ? ['all'] : []))

  public readonly user$ = this.userService.data

  public readonly grantsList$: Observable<ContractGrantModel[]> = combineLatest(
    [this.grants.data$, this.userService.data, this.selectedTagName$, this.contract$]
  )
    .pipe(
      map(([grants, userServiceData, selectedTagName, contract]) => grants
          .filter((grant: ContractGrantRawModel) => [
            grant?.status?.value || GrantStatusEnum.noStatus,
            'all'].includes(selectedTagName))
          .map((grant: ContractGrantRawModel): ContractGrantModel => {
            const labelRole = userServiceData?.userRole || 'undefined'
            const labelStatus = grant?.status?.value || 'undefined'
            const labelContract = contract?.name || 'undefined'
            const label = translate(
                `listing.labels.${labelContract}.${labelRole}.${labelStatus}`)

            return {
              ...grant,
              app: grant.app ? Object.values(grant.app) : [],
              // Check labels with attribute grant in lang file
              label: label.indexOf('listing.labels') === 0 ? null : label
            }
          })
          .sort((grantA, grantB) => {
            // TODO check this function

            let weight = 0
            // First priority, status
            if (grantA?.status?.value === GrantStatusEnum.rejected) {
              weight = weight + 3
            }
            if (grantB?.status?.value === GrantStatusEnum.rejected) {
              weight = weight - 3
            }

            // Second priority, zero reward
            if (!grantA?.reward?.value) {
              weight = weight + 2
            }
            if (!grantB?.reward?.value) {
              weight = weight - 2
            }

            // Thirty priority, date
            // Todo realize date in contracts

            return weight
          })),
      publishReplay(1),
      refCount()
    )

  public otherGrantList$: Observable<ContractGrantModel[]> = this.grantsList$
  .pipe(
      map((grants) => grants.filter((grant: ContractGrantModel) => !grant?.label))
  )

  public importantGrantList$: Observable<ContractGrantModel[]> = this.grantsList$
  .pipe(
      map((grants) => grants.
                filter((grant: ContractGrantModel) => !!grant?.label)
      )
  )

  constructor (
    public route: ActivatedRoute,
    public cdr: ChangeDetectorRef,
    @Inject(APP_CONSTANTS) public readonly constants: AppConstantsInterface,
    @Inject(API) public readonly api: AppApiInterface,
    @Inject(GRANTS) public readonly grants: LoadingWrapperModel<ContractGrantRawModel[]>,
    public userService: UserService,
    public contractService: ContractService,
    public teamService: TeamService
  ) {}

  selectTag ($event: string): void {
    this.selectedTagName$.next($event)
  }

  // isCanShowByTag (status: string | null, selectedTagName: string): boolean {
  //   if (selectedTagName === 'all') {
  //     return true
  //   }
  //   status = !status ? 'no_status' : status
  //   if (status === selectedTagName || selectedTagName === '') {
  //     return true
  //   }
  //   return false
  // }

  // isAppliedForGrant (grantId: string): boolean {
  //   return this.userService.data.getValue().apply.includes(grantId)
  // }

  ngOnDestroy (): void {
    this.grants.destroy()
  }
}
