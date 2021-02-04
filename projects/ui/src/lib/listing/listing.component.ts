import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject,
  Input,
  OnDestroy,
} from '@angular/core'
import {GRANTS, GRANTS_PROVIDERS} from './listing.providers'
import {
  ContractGrantExtendedModel, ContractGrantModel, ContractRawDataNumber
} from '@services/contract/contract.model'
import {LoadingWrapperModel} from '@libs/loading-wrapper/loading-wrapper'
import {
  API,
  APP_CONSTANTS,
  AppApiInterface,
  AppConstantsInterface
} from '@constants'
import {UserService} from '@services/user/user.service'
import {filter, map, tap} from 'rxjs/operators'
import {ContractService} from '@services/contract/contract.service'
import {TeamService} from '@services/team/team.service'
import {BehaviorSubject, combineLatest, Observable} from 'rxjs'
import {translate} from '@ngneat/transloco'
import {GrantStatusEnum, GrantsVariationType} from '@services/static/static.model'
import {canBeCompleted, fixReward, sortOtherGrant} from "@ui/listing/functions";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'ui-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: GRANTS_PROVIDERS
})
export class ListingComponent implements OnDestroy {
  @Input() contract: GrantsVariationType | null = null
  public readonly grantsVariationActive = '1'
  public readonly grantStatusEnum = GrantStatusEnum
  public selectedTagName$ = new BehaviorSubject('all')
  public readonly listGrantStatuses$ = this.grants.data$.pipe(
    map((grants) => {
      const list = Object.values(grants.reduce((origin, grant) => ({
        ...origin,
        ...(grant?.status?.value === undefined
          ? {[GrantStatusEnum.noStatus]: GrantStatusEnum.noStatus}
          : {[grant?.status?.value]: grant?.status?.value})
      }), {}))

      if (list.length === 0) {
        return []
      }

      if (list.length > 1) {
        return ['all'].concat(list as [])
      }

      return ['all']
    })
  )

  public readonly user$ = this.userService.data

  public grantUrl$ = this.route.paramMap
    .pipe(
      // @ts-ignore
      map((e) => e.params)
    )

  public readonly otherGrant$: Observable<ContractGrantExtendedModel[] | null> = combineLatest(
    [this.grants.data$, this.userService.data, this.selectedTagName$, this.grantUrl$]
  )
    .pipe(

      map(([grants, userServiceData, selectedTagName, url]) => ({ // all to one
        grants: grants.filter((e) => {
          const status = e.status && e.status.value ? e.status.value : null
          if (
            status !== GrantStatusEnum.readyToApply || (selectedTagName === GrantStatusEnum.readyToApply && status === selectedTagName)) {
            return true
          }
        }),
        selectedTag: selectedTagName,
        isDAO: userServiceData.roles.isDAO,
        canBeCompleted: canBeCompleted(grants, url.contractType, userServiceData)
      })),
      map((data) => ({...data, grants: fixReward(data.grants)})),
      map((data) => // isCanShowByTag
        ({
          ...data,
          grants: data.grants.filter((e) => {
            const status = e.status && e.status.value ? e.status.value : null
            return this.isCanShowByTag(status, data.selectedTag)
          })
        })
      ),
      map((data) => // add roleText, statusText
        ({
          ...data,
          grants: data.grants.map((e: ContractGrantExtendedModel) => {
            const status = e.status && e.status.value ? e.status.value : 'no_status'
            if(status != 'team_choosen') e.statusText = translate('listing.status.' + status)
            if (data.isDAO && status === GrantStatusEnum.proposed && e.id) {
              const isVote = this.userService.data.getValue().voted.includes(e.id)
              const voteText = (isVote ? 'vote_counted' : 'need_vote')
              e.voteText = translate('listing.DAO_subtext.' + voteText)
            }
            return e
          })
        })
      ),
      map((data): ContractGrantExtendedModel[] | null => {
        if (data.grants.length) {
          data.grants.forEach(g => g.canBeCompleted = data.canBeCompleted)
          return data.grants
        } else return null
      }),
      filter(e => e != null && e != undefined),
      // @ts-ignore
      map((data) => sortOtherGrant(data)),
    )

  public readonly importantGrant$: Observable<ContractGrantExtendedModel[] | null> = combineLatest(
    [this.grants.data$, this.userService.data, this.selectedTagName$]
  )
    .pipe(
      map(([grants, userServiceData, selectedTagName]) => ({ // all to one
        grants: grants.filter((e) => {
          const status = (e.status && e.status.value) || null
          if (status === GrantStatusEnum.readyToApply && selectedTagName === 'all') {
            return true
          }
          return false
        }),
        selectedTag: selectedTagName,
        isDAO: userServiceData.roles.isDAO
      })),
      map((data) => // fix reward
        ({
          ...data,
          grants: fixReward(data.grants)
        })
      ),
      map((data) => // add statusText
        ({
          ...data,
          grants: data.grants.map((e: ContractGrantExtendedModel) => {
            const status = e.status && e.status.value ? e.status.value : 'no_status'
            // if(status != 'team_choosen') e.statusText = translate('listing.status.' + status)
            e.statusText = translate('listing.status.' + status)
            return e
          })
        })
      ),
      map((data): ContractGrantExtendedModel[] | null => data.grants.length ? data.grants : null)
      // tap((data) => console.log('importantGrant$', data))
    )

  constructor(
    public route: ActivatedRoute,
    public cdr: ChangeDetectorRef, // eslint-disable-line
    @Inject(APP_CONSTANTS) public readonly constants: AppConstantsInterface, // eslint-disable-line
    @Inject(API) public readonly api: AppApiInterface, // eslint-disable-line
    @Inject(GRANTS) public readonly grants: LoadingWrapperModel<ContractGrantModel[]>, // eslint-disable-line
    public userService: UserService, // eslint-disable-line
    public contractService: ContractService, // eslint-disable-line
    public teamService: TeamService // eslint-disable-line
  ) {
  }

  selectedTag($event: string): void {
    this.selectedTagName$.next($event)
  }

  isCanShowByTag(status: string | null, selectedTagName: string): boolean {
    if (selectedTagName === 'all') {
      return true
    }
    status = !status ? 'no_status' : status
    if (status === selectedTagName || selectedTagName === '') {
      return true
    }
    return false
  }

  isAppliedForGrant(grantId: string): boolean {
    return this.userService.data.getValue().apply.includes(grantId)
  }

  ngOnDestroy(): void {
    this.grants.destroy()
  }
}
