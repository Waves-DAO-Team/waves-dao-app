import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core'
import { UserService } from '@services/user/user.service'
import { ContractGrantModel } from '@services/contract/contract.model'
import { GrantStatusEnum } from '@services/static/static.model'

@Component({
  selector: 'ui-vote-for-task',
  templateUrl: './vote-for-task.component.html',
  styleUrls: ['./vote-for-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VoteForTaskComponent {

  @Input() isShow = false
  @Input() isVote = false

  @Output() newVoteEvent = new EventEmitter<'like' | 'dislike'>();

  constructor () {}
}
