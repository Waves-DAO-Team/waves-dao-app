import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject,
  Input,
  OnDestroy,
} from '@angular/core'
import {GRANTS, GRANTS_PROVIDERS} from './listing.providers'
import {
  ContractGrantModel, ContractGrantRawModel, GrantParams,
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
import {BehaviorSubject, combineLatest, Observable} from 'rxjs'
import {translate} from '@ngneat/transloco'
import {
  GrantStatusEnum,
  GrantsVariationType, GrantTypesEnum,
} from '@services/static/static.model'
import {ActivatedRoute} from '@angular/router'
import {Async} from '@libs/decorators/async-input.decorator'
import {UserDataInterface} from '@services/user/user.interface'
import {TextOptions} from '@services/text-options/text-options'
import {log} from '@libs/log/log.rxjs-operator'
import {debug$} from '@libs/decorators/debug$.decorator'


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

  @debug$
  public readonly listGrantStatuses$: Observable<string[]> = this.grants.data$.pipe(
    log('ListingComponent::listGrantStatuses$'),
    map((grants: ContractGrantRawModel[]): string[] =>
        grants instanceof Array ? Object.values(
            grants.reduce<{[s: string]: string}>(
                (origin, grant) => ({
                  ...origin,
                  ...(grant?.status?.value === undefined
                    ? {[GrantStatusEnum.noStatus]: GrantStatusEnum.noStatus}
                    : {[grant?.status?.value]: grant?.status?.value})
                }), {})) : []),
    map((list: string[]) => list.length > 0 ? ['all'].concat(list as []) : list.length === 1 ? ['all'] : []),
  )

  @debug$
  public readonly grantsList$: Observable<ContractGrantModel[]> = combineLatest(
    [this.grants.data$, this.userService.data, this.selectedTagName$, this.contract$]
  )
    .pipe(
      map(([grants, userServiceData, selectedTagName, contract]) => grants
          .filter((grant: ContractGrantRawModel) => [
            grant?.status?.value || GrantStatusEnum.noStatus,
            'all'].includes(selectedTagName))
          .map((grant: ContractGrantRawModel): ContractGrantModel => {
            const label = this.createLabel(grant, userServiceData, contract)

            return {
              ...grant,
              app: grant.app ? Object.values(grant.app) : [],
              // Check labels with attribute grant in lang file
              label
            } as ContractGrantModel
          })
          .sort(this.sort)
      ),
      publishReplay(1),
      refCount()
    )

  @debug$
  public otherGrantList$: Observable<ContractGrantModel[] | null> = this.grantsList$
  .pipe(
      map((grants) => grants
        .filter((grant: ContractGrantModel) => !grant?.label?.important)
      ),
      map(grants => grants.length > 0 ? grants : null)
  )

  @debug$
  public importantGrantList$: Observable<ContractGrantModel[] | null> = this.grantsList$
  .pipe(
      map((grants) => grants
          .filter((grant: ContractGrantModel) => !!grant?.label?.important)
      ),
      map(grants => grants.length > 0 ? grants : null)
  )

  constructor (
    public route: ActivatedRoute,
    public cdr: ChangeDetectorRef,
    @Inject(APP_CONSTANTS) public readonly constants: AppConstantsInterface,
    @Inject(API) public readonly api: AppApiInterface,
    @Inject(GRANTS) public readonly grants: LoadingWrapperModel<ContractGrantRawModel[]>,
    public userService: UserService,
    public contractService: ContractService,
  ) {}

  selectTag ($event: string): void {
    this.selectedTagName$.next($event)
  }

  ngOnDestroy (): void {
    this.grants.destroy()
  }

  private sort (grantA: ContractGrantModel, grantB: ContractGrantModel): number {
    // TODO check this function

    let weight = 0
    // First priority, status
    if (grantA?.status?.value === GrantStatusEnum.rejected) {
      weight = weight + 4
    }
    if (grantB?.status?.value === GrantStatusEnum.rejected) {
      weight = weight - 4
    }

    // priority, zero reward
    if (!grantA?.reward?.value) {
      weight = weight + 2
    }
    if (!grantB?.reward?.value) {
      weight = weight - 2
    }

    // priority, finished grant
    if (grantA?.status?.value === GrantStatusEnum.workFinished) {
      weight = weight + 3
    }
    if (grantB?.status?.value === GrantStatusEnum.workFinished) {
      weight = weight - 3
    }

    // priority, grant with label
    if (!!grantA?.label?.label) {
      weight = weight - 3
    }
    if (grantB?.label?.label) {
      weight = weight + 3
    }

    // Thirty priority, date
    // Todo realize date in contracts

    return weight
  }

  private createLabel (grant: ContractGrantRawModel, userServiceData: UserDataInterface, contract: GrantsVariationType): GrantParams {
    let params: GrantParams = {}

    const labelRole = userServiceData?.userRole || 'undefined'
    const labelStatus = grant?.status?.value || 'undefined'
    const labelContract = contract?.name || 'undefined'

    params = {
      ...params,
      ...this.getStatusProperties(grant, userServiceData, labelContract)
    }

    const labelImportant = params?.important === true ? 'true' : params?.important === false ? 'false' : 'undefined'


    const label = translate(
      `listing.labels.${labelContract}.${labelRole}.${labelStatus}.${labelImportant}`, params)

    return {
      ...params,
      label: label.indexOf('listing.labels') === 0 ? null : label,
    }
  }

  getStatusProperties (grant: ContractGrantRawModel, userServiceData: UserDataInterface, contractType: GrantTypesEnum): GrantParams {
    const textOptions = (new TextOptions(grant, userServiceData, contractType)).generateAll()
    switch (grant?.status?.value) {
      case GrantStatusEnum.proposed:
        return {
          ...textOptions,
          important: userServiceData.roles.isDAO ? !(grant?.voted && grant?.voted[userServiceData?.userAddress]) : undefined
        }
      case GrantStatusEnum.readyToApply:
        return {
          ...textOptions,
          important: userServiceData.roles.isAuth ?
            grant?.applicants && grant?.applicants?.value.indexOf(userServiceData?.userAddress) >= 0 : undefined
        }
      case GrantStatusEnum.approved:
        return {
          ...textOptions,
        }
      case GrantStatusEnum.rejected:
        return {
          ...textOptions,
        }
      case GrantStatusEnum.teamChosen:
        return {
          ...textOptions,
        }
      case GrantStatusEnum.solutionChosen:
        return {
          ...textOptions,
        }
      case GrantStatusEnum.workStarted:
        return {
          ...textOptions,
        }
      case GrantStatusEnum.workFinished:
        return {
          ...textOptions,
        }
      case GrantStatusEnum.votingStarted:
        return {
          ...textOptions,
        }
      case GrantStatusEnum.noStatus:
        return {
          ...textOptions,
        }
    }
    return {}
  }
}
