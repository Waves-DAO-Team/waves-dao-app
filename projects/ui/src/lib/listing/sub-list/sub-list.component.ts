import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Inject,
  Input
} from '@angular/core'

import {APP_CONSTANTS, AppConstantsInterface} from '@constants'
import {GrantStatusEnum, GrantsVariationType} from '@services/static/static.model'
import {ContractGrantExtendedModel,
  ContractGrantModel,
} from '@services/contract/contract.model'
import {HashService} from '@services/hash/hash.service'
import {Observable} from 'rxjs'
import {Async} from '@libs/decorators'
import {filter, map, publishReplay, refCount, tap} from 'rxjs/operators'
import {log} from '@libs/log'

@Component({
  selector: 'ui-sub-list',
  templateUrl: './sub-list.component.html',
  styleUrls: ['./sub-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubListComponent {

  grantStatusEnum = GrantStatusEnum

  @Input() contract: GrantsVariationType | null = null
  @Async() @HostBinding('class.enable') @Input() grants!: Observable<ContractGrantModel[]>
  @Input() isImportant = false

  public readonly grants$ = this.grants.pipe(
    filter(e => !!e),
    map((grants) => grants as ContractGrantExtendedModel[]),
    map((grants) => grants.map(grant => ({
        ...grant,
        isHashValid: this.hashService.isHashValid(grant.hash?.value || '', grant.link?.value || '')
      })
    )),
    map( grants => grants.filter((item) => {return item?.status?.value !== 'hide'})),
    log('SubListComponent::grants$'),
    publishReplay(1),
    refCount()
  )

  @Input() public type: 'default' | 'active' = 'default'
  @Input() title: string | null = null

  constructor (
    public hashService: HashService,
    @Inject(APP_CONSTANTS) public readonly constants: AppConstantsInterface
  ) {}
}
