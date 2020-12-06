import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core'
import { GRANTS, GRANTS_PROVIDERS } from './listing.providers'
import { ContractGrantExtendedModel, ContractGrantModel, GrantsVariationType } from '@services/contract/contract.model'
import { LoadingWrapperModel } from '@libs/loading-wrapper/loading-wrapper'
import {
  API,
  APP_CONSTANTS,
  AppApiInterface,
  AppConstantsInterface
} from '@constants'
import { UserService } from '@services/user/user.service'
import { RoleEnum } from '@services/user/user.interface'
import { GrantStatusEnum } from '@services/../interface'
import { map, tap } from 'rxjs/operators'
import { ContractService } from '@services/contract/contract.service'
import { TeamService } from '@services/team/team.service'
import { translate } from '@ngneat/transloco'
import { BehaviorSubject, combineLatest } from 'rxjs'

@Component({
  selector: 'ui-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: GRANTS_PROVIDERS
})
export class ListingComponent implements OnInit, OnDestroy {
  @Input() contract: GrantsVariationType | null = null;

  constructor (
    public cdr: ChangeDetectorRef,
    @Inject(APP_CONSTANTS) public readonly constants: AppConstantsInterface,
    @Inject(API) public readonly api: AppApiInterface,
    @Inject(GRANTS) public readonly grants: LoadingWrapperModel<ContractGrantModel[]>,
    public userService: UserService,
    public contractService: ContractService,
    public teamService: TeamService
  ) {
  }

  public readonly grantsVariationActive = '1'
  public readonly RoleEnum = RoleEnum
  public readonly GrantStatusEnum = GrantStatusEnum
  public selectedTagName = ''
  public selectedTagName$ = new BehaviorSubject('')
  public listGrantStatuses: string[] = []

  public readonly listGrantStatuses$ = this.grants.data$.pipe(
    tap(
      (grants) => {
        this.listGrantStatuses = []
        this.listGrantStatuses.push('all')
        grants.forEach((grant) => {
          const status: string = grant.status?.value === undefined ? GrantStatusEnum.noStatus : grant.status?.value
          if (!(this.listGrantStatuses.includes(status))) {
            this.listGrantStatuses.push(status)
          }
        })
      }
    )
  ).subscribe()

  public readonly user$ = this.userService.data

  public readonly otherGrant$ = combineLatest([this.grants.data$, this.userService.data, this.selectedTagName$])
    .pipe(
      map(([grants, userServiceData, selectedTagName]) => {
        return { // all to one
          grants: grants.filter((e) => {
            const status = (e.status && e.status.value) || null
            if (status !== GrantStatusEnum.readyToApply) {
              return true
            } else if (selectedTagName === GrantStatusEnum.readyToApply && status === GrantStatusEnum.readyToApply) {
              return true
            }
          }),
          selectedTag: selectedTagName,
          isDAO: userServiceData.roles.isDAO
        }
      }),
      map((data) => { // fix reward
        return {
          ...data,
          grants: data.grants.map((e) => {
            if (e.reward && e.reward.value && typeof e.reward.value === 'number') {
              e.reward.value = (e.reward.value / 100000000).toFixed(2)
            } else if (e.reward === undefined) {
              // @ts-ignore
              e.reward = {}
              // @ts-ignore
              e.reward.value = '0.00'
            }
            return e
          })
        }
      }),
      map((data) => { // isCanShowByTag
        return {
          ...data,
          grants: data.grants.filter((e) => {
            const status = e.status && e.status.value ? e.status.value : null
            return this.isCanShowByTag(status, data.selectedTag)
          })
        }
      }),
      map((data) => { // add roleText, statusText
        return {
          ...data,
          grants: data.grants.map((e: ContractGrantExtendedModel) => {
            const status = e.status && e.status.value ? e.status.value : 'no_status'
            e.statusText = translate('listing.status.' + status)
            if (data.isDAO && status === GrantStatusEnum.proposed && e.id) {
              const isVote = this.userService.data.getValue().voted.includes(e.id)
              const voteText = (isVote ? 'vote_counted' : 'need_vote')
              e.voteText = translate('listing.DAO_subtext.' + voteText)
            }
            return e
          })
        }
      }),
      map((data): ContractGrantExtendedModel[] => {
        return data.grants
      })
      // tap((data) => console.log('otherGrant$', data))
    )

  public readonly importantGrant$ = combineLatest([this.grants.data$, this.userService.data, this.selectedTagName$])
    .pipe(
      map(([grants, userServiceData, selectedTagName]) => {
        return { // all to one
          grants: grants.filter((e) => {
            const status = (e.status && e.status.value) || null
            if (status === GrantStatusEnum.readyToApply && selectedTagName === 'all') {
              return true
            }
            return false
          }),
          selectedTag: selectedTagName,
          isDAO: userServiceData.roles.isDAO
        }
      }),
      map((data) => { // fix reward
        return {
          ...data,
          grants: data.grants.map((e) => {
            if (e.reward && e.reward.value && typeof e.reward.value === 'number') {
              e.reward.value = (e.reward.value / 100000000).toFixed(2)
            } else if (e.reward === undefined) {
              // @ts-ignore
              e.reward = {}
              // @ts-ignore
              e.reward.value = '0.00'
            }
            return e
          })
        }
      }),
      map((data) => { // add statusText
        return {
          ...data,
          grants: data.grants.map((e: ContractGrantExtendedModel) => {
            const status = e.status && e.status.value ? e.status.value : 'no_status'
            e.statusText = translate('listing.status.' + status)
            return e
          })
        }
      }),
      map((data): ContractGrantExtendedModel[] => {
        return data.grants
      })
      // tap((data) => console.log('importantGrant$', data))
    )

  ngOnInit (): void {
  }

  selectedTag ($event: string) {
    this.selectedTagName = $event
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

  setEnv (address: string) {
    this.contractService.switchContract(address)
  }

  isAppliedForGrant (grantId: string): boolean {
    return this.userService.data.getValue().apply.includes(grantId)
  }

  ngOnDestroy () {
    this.grants.destroy()
  }
}
