import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Inject,
  Input, OnDestroy
} from '@angular/core'

import {APP_CONSTANTS, AppConstantsInterface} from '@constants'
import {GrantStatusEnum, GrantsVariationType} from '@services/static/static.model'
import {ContractGrantExtendedModel,
  ContractGrantModel,
} from '@services/contract/contract.model'
import {HashService} from '@services/hash/hash.service'
import {Observable, Subject} from 'rxjs'
import {Async, DestroyedSubject} from '@libs/decorators'
import {filter, map, publishReplay, refCount, takeUntil, tap} from 'rxjs/operators'
import {log} from '@libs/log'

@Component({
  selector: 'ui-sub-list',
  templateUrl: './sub-list.component.html',
  styleUrls: ['./sub-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubListComponent implements OnDestroy{

  grantStatusEnum = GrantStatusEnum
  @DestroyedSubject() private readonly destroyed$!: Subject<null>

  @Input() contract: GrantsVariationType | null = null
  @Async() @HostBinding('class.enable') @Input() grants!: Observable<ContractGrantModel[]>
  @Input() isImportant = false

  otherGrantList: ContractGrantExtendedModel[] = []
  importantGrantList: ContractGrantExtendedModel[] = []

  public readonly grants$ = this.grants.pipe(
    takeUntil(this.destroyed$),
    filter(e => !!e),
    map((grants) => grants as ContractGrantExtendedModel[]),
    map((grants) => grants.map(grant => ({
        ...grant,
        isHashValid: this.hashService.isHashValid(grant.hash?.value || '', grant.link?.value || '')
      })
    )),
    map( grants => grants.filter((item) => item?.status?.value !== 'hide')),
    tap( grants => {
      this.importantGrantList = grants.filter(grant => grant?.label?.important === true)
      this.otherGrantList = grants.filter(grant => grant?.label?.important !== true)
    }),
    log('SubListComponent::grants$'),
    publishReplay(1),
    refCount()
  ).subscribe()

  @Input() public type: 'default' | 'active' = 'default'
  @Input() title: string | null = null

  constructor (
    public hashService: HashService,
    @Inject(APP_CONSTANTS) public readonly constants: AppConstantsInterface
  ) {}

  ngOnDestroy (): void {
  }
}
