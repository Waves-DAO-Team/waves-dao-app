import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, Inject,
  Input, Output, TemplateRef
  , EventEmitter,
  OnDestroy
} from '@angular/core'
import {
  ContractGrantModel
} from '@services/contract/contract.model'
import { UserService } from '@services/user/user.service'
import { LinkContentService } from '@services/link-content/link-content.service'
import { DisruptiveContractService } from '@services/contract/disruptive-contract.service'
import { DestroyedSubject } from '@libs/decorators/destroyed-subject.decorator'
import { Subject } from 'rxjs'
import { API, AppApiInterface } from '@constants'
import { grantStatusEnum, GrantsVariationType } from '@services/static/static.model'

@Component({
  selector: 'ui-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityComponent implements OnDestroy {
  @Input() public readonly grant: ContractGrantModel = {}
  @Input() public readonly contract!: GrantsVariationType
  @Input() controlsTemplate: TemplateRef<Component> | undefined
  @Input() stepperTemplate: TemplateRef<Component> | undefined
  @Input() teamTemplate: TemplateRef<Component> | undefined
  @Input() voteForTaskTemplate: TemplateRef<Component> | undefined
  @Input() headerControlsTemplate: TemplateRef<Component> | undefined
  @Input() solutionsTemplate: TemplateRef<Component> | undefined

  @Output() newFinishVoteEvent = new EventEmitter()
  @Output() newStartWorkEvent = new EventEmitter()
  @Output() newRejectEvent = new EventEmitter()
  @Output() newAcceptWorkResultEvent = new EventEmitter<string>()
  @Output() newAddRewardEvent = new EventEmitter()

  // Subject activate if component destroyed
  // And unsubscribe all subscribers used takeUntil(this.destroyed$)
  @DestroyedSubject() private readonly destroyed$!: Subject<null>

  public grantStatusEnum = grantStatusEnum
  reportLink = ''

  constructor (
    public userService: UserService,
    public disruptiveContractService: DisruptiveContractService,
    public linkContentService: LinkContentService,
    public cdr: ChangeDetectorRef,
    @Inject(API) public readonly api: AppApiInterface
  ) {
  }

  startWork () {
    this.disruptiveContractService.startWork(this.grant?.id as string).subscribe()
  }

  ngOnDestroy () {
  }
}
