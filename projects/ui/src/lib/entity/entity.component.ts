import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, Inject,
  Input, Output, TemplateRef
  , EventEmitter,
  OnDestroy
} from '@angular/core'
import {ContractGrantExtendedModel} from '@services/contract/contract.model'
import { UserService } from '@services/user/user.service'
import { DisruptiveContractService } from '@services/contract/disruptive-contract.service'
import { DestroyedSubject } from '@libs/decorators/destroyed-subject.decorator'
import { Subject } from 'rxjs'
import { API, AppApiInterface } from '@constants'
import { GrantStatusEnum, GrantsVariationType } from '@services/static/static.model'

@Component({
  selector: 'ui-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityComponent implements OnDestroy {
  @Input() isShowRaw = false
  @Input() votedCount = null
  @Input() public readonly grant!: ContractGrantExtendedModel
  @Input() public readonly contract!: GrantsVariationType
  @Input() controlsTemplate: TemplateRef<Component> | undefined
  @Input() stepperTemplate: TemplateRef<Component> | undefined
  @Input() teamTemplate: TemplateRef<Component> | undefined
  @Input() voteForTaskTemplate: TemplateRef<Component> | undefined
  @Input() headerControlsTemplate: TemplateRef<Component> | undefined
  @Input() solutionsTemplate: TemplateRef<Component> | undefined
  @Input() linkTemplate: TemplateRef<Component> | undefined

  @Output() newFinishVoteEvent = new EventEmitter()
  @Output() newStartWorkEvent = new EventEmitter()
  @Output() newRejectEvent = new EventEmitter()
  @Output() newAcceptWorkResultEvent = new EventEmitter<string>()
  @Output() newAddRewardEvent = new EventEmitter()

  // Subject activate if component destroyed
  // And unsubscribe all subscribers used takeUntil(this.destroyed$)
  @DestroyedSubject() private readonly destroyed$!: Subject<null>

  public grantStatusEnum = GrantStatusEnum
  reportLink = ''

  constructor (
    public userService: UserService,
    public disruptiveContractService: DisruptiveContractService,
    public cdr: ChangeDetectorRef,
    @Inject(API) public readonly api: AppApiInterface
  ) {
  }

  startWork (): void {
    this.disruptiveContractService.startWork(this.grant?.id as string).subscribe()
  }

  ngOnDestroy (): void {}
}
