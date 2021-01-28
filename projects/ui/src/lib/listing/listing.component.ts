import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core'
import { GRANTS, GRANTS_PROVIDERS } from './listing.providers'
import {
  ContractGrantExtendedModel, ContractGrantModel, ContractRawDataNumber
} from '@services/contract/contract.model'
import { LoadingWrapperModel } from '@libs/loading-wrapper/loading-wrapper'
import {
  API,
  APP_CONSTANTS,
  AppApiInterface,
  AppConstantsInterface
} from '@constants'
import { UserService } from '@services/user/user.service'
import { roleEnum } from '@services/user/user.interface'
import { map } from 'rxjs/operators'
import { ContractService } from '@services/contract/contract.service'
import { TeamService } from '@services/team/team.service'
import { BehaviorSubject, combineLatest, Observable } from 'rxjs'
import { translate } from '@ngneat/transloco'
import { grantStatusEnum, GrantsVariationType } from '@services/static/static.model'

@Component({
  selector: 'ui-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: GRANTS_PROVIDERS
})
export class ListingComponent implements OnInit, OnDestroy {
  @Input() contract: GrantsVariationType | null = null
  public readonly grantsVariationActive = '1'
  public readonly grantStatusEnum = grantStatusEnum
  public selectedTagName$ = new BehaviorSubject('all')
  public readonly listGrantStatuses$ = this.grants.data$.pipe(
    map((grants) => {
      const list = Object.values(grants.reduce((origin, grant) => ({
        ...origin,
        ...(grant?.status?.value === undefined
          ? { [grantStatusEnum.noStatus]: grantStatusEnum.noStatus }
          : { [grant?.status?.value]: grant?.status?.value })
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
  public readonly otherGrant$: Observable<ContractGrantExtendedModel[] | null> = combineLatest(
    [this.grants.data$, this.userService.data, this.selectedTagName$]
  )
    .pipe(
      map(([grants, userServiceData, selectedTagName]) => ({ // all to one
        grants: grants.filter((e) => {
          const status = e.status && e.status.value ? e.status.value : null
          if (
            status !== grantStatusEnum.readyToApply || (selectedTagName === grantStatusEnum.readyToApply && status === selectedTagName)) {
            return true
          }
        }),
        selectedTag: selectedTagName,
        isDAO: userServiceData.roles.isDAO
      })),
      map((data) => // fix reward
        ({
          ...data,
          grants: data.grants.map((e) => {
            if (e.reward && e.reward.value && typeof e.reward.value === 'number') {
              e.reward.value = (e.reward.value / 100000000).toFixed(2)
            } else if (e.reward === undefined) {
              const newData: ContractRawDataNumber = {
                key: '', type: 0, value: '0.00'
              }
              e.reward = newData
            }
            return e
          })
        })
      ),
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
            e.statusText = translate('listing.status.' + status)
            if (data.isDAO && status === grantStatusEnum.proposed && e.id) {
              const isVote = this.userService.data.getValue().voted.includes(e.id)
              const voteText = (isVote ? 'vote_counted' : 'need_vote')
              e.voteText = translate('listing.DAO_subtext.' + voteText)
            }
            return e
          })
        })
      ),
      map((data): ContractGrantExtendedModel[] | null => data.grants.length ? data.grants : null)
      // tap((data) => console.log('otherGrant$', data))
    )
  public readonly importantGrant$: Observable<ContractGrantExtendedModel[] | null> = combineLatest(
    [this.grants.data$, this.userService.data, this.selectedTagName$]
  )
    .pipe(
      map(([grants, userServiceData, selectedTagName]) => ({ // all to one
        grants: grants.filter((e) => {
          const status = (e.status && e.status.value) || null
          if (status === grantStatusEnum.readyToApply && selectedTagName === 'all') {
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
          grants: data.grants.map((e) => {
            if (e.reward && e.reward.value && typeof e.reward.value === 'number') {
              e.reward.value = (e.reward.value / 100000000).toFixed(2)
            } else if (e.reward === undefined) {

              const newData: ContractRawDataNumber = {
                key: '', type: 0, value: '0.00'

              }
              e.reward = newData
            }
            return e
          })
        })
      ),
      map((data) => // add statusText
        ({
          ...data,
          grants: data.grants.map((e: ContractGrantExtendedModel) => {
            const status = e.status && e.status.value ? e.status.value : 'no_status'
            e.statusText = translate('listing.status.' + status)
            return e
          })
        })
      ),
      map((data): ContractGrantExtendedModel[] | null => data.grants.length ? data.grants : null)
      // tap((data) => console.log('importantGrant$', data))
    )

  constructor (
      public cdr: ChangeDetectorRef,
      @Inject(APP_CONSTANTS) public readonly constants: AppConstantsInterface,
      @Inject(API) public readonly api: AppApiInterface,
      @Inject(GRANTS) public readonly grants: LoadingWrapperModel<ContractGrantModel[]>,
      public userService: UserService,
      public contractService: ContractService,
      public teamService: TeamService
  ) {}

  ngOnInit (): void {}

  selectedTag ($event: string) {
    this.selectedTagName$.next($event)
  }

  isCanShowByTag (status: string | null, selectedTagName: string) {
    if (selectedTagName === 'all') {
      return true
    }
    status = !status ? 'no_status' : status
    if (status === selectedTagName || selectedTagName === '') {
      return true
    }
    return false
  }

  isAppliedForGrant (grantId: string): boolean {
    return this.userService.data.getValue().apply.includes(grantId)
  }

  ngOnDestroy () {
    this.grants.destroy()
  }
}
