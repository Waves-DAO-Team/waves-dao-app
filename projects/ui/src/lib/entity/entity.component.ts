import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, Inject,
  Input, Output, TemplateRef
  , EventEmitter
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
import { GrantStatusEnum, GrantsVariationType } from '@services/static/static.model'

@Component({
  selector: 'ui-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityComponent {
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

  public grantStatusEnum = GrantStatusEnum
  reportLink = ''

  constructor (
    public userService: UserService, // eslint-disable-line
    public disruptiveContractService: DisruptiveContractService, // eslint-disable-line
    public linkContentService: LinkContentService, // eslint-disable-line
    public cdr: ChangeDetectorRef, // eslint-disable-line
    @Inject(API) public readonly api: AppApiInterface // eslint-disable-line
  ) {
  }

  startWork (): void{
    this.disruptiveContractService.startWork(this.grant?.id as string).subscribe()
  }

}
