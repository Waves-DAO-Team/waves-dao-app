import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, Inject,
  Input,
  OnDestroy,
  OnInit, Output, TemplateRef
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

import { VoteTeamEventInterface } from '@pages/entity-page/entity.interface'

@Component({
  selector: 'ui-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityComponent {
  @Input() public readonly grant: ContractGrantModel = {}
  @Input() public readonly contract!: GrantsVariationType
  @Input() controlsTemplate: TemplateRef<any> | undefined;
  @Input() teamTemplate: TemplateRef<any> | undefined;

  public grantStatusEnum = GrantStatusEnum

  @Output() newVoteEvent = new EventEmitter<'like' | 'dislike'>();
  @Output() newSignupEvent = new EventEmitter()
  @Output() newOpenApplyModalEvent = new EventEmitter()
  @Output() newVoteTeamEvent = new EventEmitter<VoteTeamEventInterface>()

  @Output() newFinishVoteEvent = new EventEmitter()
  @Output() newStartWorkEvent = new EventEmitter()
  @Output() newRejectEvent = new EventEmitter()
  @Output() newAcceptWorkResultEvent = new EventEmitter<string>()
  @Output() newFinishApplicantsVoteEvent = new EventEmitter()
  @Output() newAddRewardEvent = new EventEmitter()
  @Output() newEditGrantEvent = new EventEmitter()

  // Subject activate if component destroyed
  // And unsubscribe all subscribers used takeUntil(this.destroyed$)
  @DestroyedSubject() private readonly destroyed$!: Subject<null>;

  reportLink = '';

  constructor (
    public userService: UserService,
    public disruptiveContractService: DisruptiveContractService,
    public linkContentService: LinkContentService,
    public cdr: ChangeDetectorRef,
    @Inject(API) public readonly api: AppApiInterface
  ) {}

  startWork () {
    this.disruptiveContractService.startWork(this.grant?.id as string).subscribe()
  }
}
