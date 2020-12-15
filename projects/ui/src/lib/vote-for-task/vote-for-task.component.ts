import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { UserService } from '@services/user/user.service'
import { ContractGrantModel } from '@services/contract/contract.model'
import { GrantStatusEnum } from '@services/static/static.model'

@Component({
  selector: 'ui-vote-for-task',
  templateUrl: './vote-for-task.component.html',
  styleUrls: ['./vote-for-task.component.scss']
})
export class VoteForTaskComponent implements OnInit {
  grantStatusEnum = GrantStatusEnum

  @Input() public readonly grant: ContractGrantModel = {}

  @Output() newVoteEvent = new EventEmitter<'like' | 'dislike'>();

  constructor (public userService: UserService) { }

  ngOnInit (): void {
  }
}
