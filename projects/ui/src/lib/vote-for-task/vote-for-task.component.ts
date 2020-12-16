import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
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

  grantStatusEnum = GrantStatusEnum

  data = {
    isShow: false,
    isVote: false
  }

  _grant: ContractGrantModel = {}
  @Input() set grant(data: ContractGrantModel) {
    if(data != this._grant) {
      this._grant = data
      this.prepareData(data)
    }
  }

  get grant() {
    return this._grant
  }

  @Output() newVoteEvent = new EventEmitter<'like' | 'dislike'>();

  constructor (public userService: UserService) { }

  private prepareData(grant: ContractGrantModel) {
    if(this.userService.data.getValue().roles.isDAO && grant.status?.value === this.grantStatusEnum.proposed) {
      this.data.isShow = true
    } else {
      this.data.isShow = false
    }
    if(grant && grant.id && this.userService.data.getValue().voted.includes(grant.id)) {
      this.data.isVote = true
    } else {
      this.data.isVote = false
    }
  }
}
