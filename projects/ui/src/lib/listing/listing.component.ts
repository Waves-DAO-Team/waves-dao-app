import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject,
  Input,
  OnDestroy,
} from '@angular/core'
import {GRANTS, GRANTS_PROVIDERS} from './listing.providers'
import {
  ContractGrantModel,
  ContractGrantRawModel,
  GrantParams,
} from '@services/contract/contract.model'
import {LoadingWrapperModel} from '@libs/loading-wrapper/loading-wrapper'
import {
  API,
  APP_CONSTANTS,
  AppApiInterface,
  AppConstantsInterface
} from '@constants'
import {UserService} from '@services/user/user.service'
import {
  distinctUntilChanged,
  map,
  publishReplay,
  refCount,
  takeUntil, tap,
} from 'rxjs/operators'
import {ContractService} from '@services/contract/contract.service'
import {BehaviorSubject, combineLatest, Observable, Subject} from 'rxjs'
import {translate} from '@ngneat/transloco'
import {
  GrantStatusEnum,
  GrantsVariationType, GrantTypesEnum,
} from '@services/static/static.model'
import {Async} from '@libs/decorators/async-input.decorator'
import {UserDataInterface} from '@services/user/user.interface'
import {TextOptions} from '@services/text-options/text-options'
import {log} from '@libs/log/log.rxjs-operator'
import { DestroyedSubject } from '@libs/decorators/destroyed-subject.decorator'


@Component({
  selector: 'ui-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: GRANTS_PROVIDERS
})
export class ListingComponent implements OnDestroy {

  @DestroyedSubject() destroyed$!: Subject<null>

  // Contract data
  @Async() @Input('contract') public readonly contract$!: Observable<GrantsVariationType>

  // Tag for list filter
  public selectedTagName$ = new BehaviorSubject<string>('all')
  public selectedTagNameStream$ = this.selectedTagName$.pipe(
      distinctUntilChanged()
  )

  // Common grants list
  public readonly grantsList$: Observable<ContractGrantModel[]> = combineLatest(
    [
      this.grants.data$,
      this.userService.stream$,
      this.selectedTagNameStream$,
      this.contract$
    ]
  )
    .pipe(
      tap( e => console.log('+++', e)),
      takeUntil(this.destroyed$),
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
      map(([
           grants,
           userServiceData,
           selectedTagName,
           contract
         ]) => grants ? grants
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
        .sort(this.sort.bind(this)) : []
      ),
      log('%c ListingComponent::grantsList$', 'color: green'),
      publishReplay(1),
      refCount()
    )

  // Filtered other grants list
  public otherGrantList$: Observable<ContractGrantModel[] | null> = this.grantsList$
  .pipe(
      takeUntil(this.destroyed$),
      map((grants) => grants
        .filter((grant: ContractGrantModel) => !grant?.label?.important)
      ),
      map(grants => grants.length > 0 ? grants : null),
      log('%c ListingComponent::otherGrantList$', 'color: green'),
      publishReplay(1),
      refCount()
  )

  // Filtered important grants
  public importantGrantList$: Observable<ContractGrantModel[] | null> = this.grantsList$
  .pipe(
      takeUntil(this.destroyed$),
      map((grants) => grants
          .filter((grant: ContractGrantModel) => !!grant?.label?.important)
      ),
      map(grants => grants.length > 0 ? grants : null),
      log('%c ListingComponent::importantGrantList$', 'color: green'),
      publishReplay(1),
      refCount()
  )

  // Statuses on current grant list
  public readonly listGrantStatuses$: Observable<string[]> = this.grants.data$.pipe(
      takeUntil(this.destroyed$),
      map((grants: ContractGrantRawModel[] | null): string[] =>
          grants instanceof Array ? Object.values(
              grants.reduce<{[s: string]: string}>(
                  (origin, grant) => ({
                    ...origin,
                    ...(grant?.status?.value === undefined
                        ? {[GrantStatusEnum.noStatus]: GrantStatusEnum.noStatus}
                        : {[grant?.status?.value]: grant?.status?.value})
                  }), {})) : []),
      map((list: string[]) => list.length > 0 ? ['all'].concat(list as []) : list.length === 1 ? ['all'] : []),
      publishReplay(1),
      refCount()
  )

  constructor (
    @Inject(APP_CONSTANTS) public readonly constants: AppConstantsInterface,
    @Inject(API) public readonly api: AppApiInterface,
    @Inject(GRANTS) public grants: LoadingWrapperModel<ContractGrantRawModel[]>,
    public userService: UserService,
    public contractService: ContractService,
    public cdr: ChangeDetectorRef,
  ) {
  }

  selectTag ($event: string): void {
    this.selectedTagName$.next($event)
  }

  ngOnDestroy (): void {
    this.grants.destroy()
  }

  private sort (grantA: ContractGrantModel, grantB: ContractGrantModel): number {
      const weightA = this.getWeightProposal(grantA, (grantA?.createdAt?.value || 0) > (grantB?.createdAt?.value || 0))
      const weightB = this.getWeightProposal(grantB, (grantB?.createdAt?.value || 0) > (grantA?.createdAt?.value || 0))
      return weightB - weightA
    }

  private getWeightProposal (proposal: ContractGrantModel, k: boolean): number {
    return 0 +
        (proposal?.status?.value === GrantStatusEnum.rejected ? -25 : 0) + // to bottom
        (proposal?.status?.value === GrantStatusEnum.workFinished ? -15 : 0) + // to previous rejected
        (!proposal?.status?.value ? -5 : 0) + // to previous rejected
        (!!proposal?.label?.my ? 10 : 0) +
        (!!proposal?.reward?.value ? 0 : -3) +
        (k ? 1 : 0)
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
      case GrantStatusEnum.votingStarted:
        return {
          ...textOptions,
          important: textOptions.my ||
              (userServiceData.roles.isDAO ?
                  !(grant?.voted && grant?.voted[userServiceData?.userAddress]) : undefined)
        }
      default:
        return {
          important: textOptions.my || undefined,
          ...textOptions,
        }
    }
  }
}
