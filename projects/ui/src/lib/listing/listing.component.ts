import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject,
  OnDestroy,
  OnInit
} from '@angular/core'
import { GRANTS, GRANTS_PROVIDERS } from './listing.providers'
import { ContractGrantExtendedModel, ContractGrantModel } from '@services/contract/contract.model'
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
import { map, switchMap, tap } from 'rxjs/operators'
import { ContractService } from '@services/contract/contract.service'
import { TeamService } from '@services/team/team.service'
import { translate } from '@ngneat/transloco'
import { BehaviorSubject, combineLatest, of } from 'rxjs'

@Component({
  selector: 'ui-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: GRANTS_PROVIDERS
})
export class ListingComponent implements OnInit, OnDestroy {
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

  ngOnInit (): void {
  }

  public readonly otherGrant$ = combineLatest([this.grants.data$, this.userService.data, this.selectedTagName$])
    .pipe(
      switchMap((a) => {
        return this.grants.data$
      }),
      map(data => {
        return data.filter((d) => {
          const status = d.status && d.status.value ? d.status.value : null
          const selectedTagName = this.selectedTagName$.getValue()
          const isNoTRTA = status !== GrantStatusEnum.readyToApply
          return selectedTagName !== GrantStatusEnum.readyToApply
            ? this.isCanShowByTag(status, selectedTagName) && isNoTRTA
            : this.isCanShowByTag(status, selectedTagName) && !isNoTRTA
        })
      }),
      map(
        (data) => {
          const newData: ContractGrantExtendedModel[] = []
          const isDAO = this.userService.data.getValue().roles.isDAO
          data.forEach((d) => {
            if (d.id) {
              const isVote = this.userService.data.getValue().voted.includes(d.id)
              const status = translate('listing.status.' + (d.status && d.status.value ? d.status.value : 'no_status'))
              const isGrantOpen = d.status && d.status.value ? d.status.value === 'proposed' : false
              const roleText = translate('listing.DAO_subtext.' + (d.status && d.status.value ? 'vote_counted' : 'need_vote'))
              newData.push({ ...d, status, isRoleText: isDAO && !isVote && isGrantOpen, roleText: roleText })
            }
          }
          )
          return newData
        }
      )
      // tap((data) => console.log('otherGrant$', data)),
    )

  public readonly importantGrant$ = combineLatest([this.grants.data$, this.userService.data, this.selectedTagName$])
    .pipe(
      switchMap((a) => {
        return this.grants.data$
      }),
      map(data => {
        if (this.selectedTagName$.getValue() === 'all') {
          return data.filter((d) => {
            return d.status ? d.status.value === GrantStatusEnum.readyToApply : false
          })
        } else return []
      }),
      map(
        (data) => {
          const newData: ContractGrantModel[] = []
          data.forEach((d) => {
            if (d.id) {
              const status = translate('listing.status.' + (d.status?.value || 'no_status'))
              newData.push({ ...d, status })
            }
          })
          return newData
        }
      ),
      tap((data) => console.log('importantGrant$', data))
    )

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
