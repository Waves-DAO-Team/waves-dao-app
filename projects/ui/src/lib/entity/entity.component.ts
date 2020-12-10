import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, Inject,
  Input,
  OnDestroy,
  OnInit, Output
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
import {EventEmitter} from '@angular/core' ;

@Component({
  selector: 'ui-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityComponent {
  @Input() public readonly grant: ContractGrantModel = {}

  @Input() public readonly contract!: GrantsVariationType

  public grantStatusEnum = GrantStatusEnum
  public isDAOVote = false
  @Output() newVoteEvent = new EventEmitter<'like' | 'dislike'>();
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


  vote (value: 'like' | 'dislike') {
    this.newVoteEvent.emit(value)
  }

}
