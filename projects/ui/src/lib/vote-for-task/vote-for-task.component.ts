import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'

type VoteStatus = 'like' | 'dislike'

@Component({
  selector: 'ui-vote-for-task',
  templateUrl: './vote-for-task.component.html',
  styleUrls: ['./vote-for-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VoteForTaskComponent {
  @Input() isShow = false
  @Input() isVote = false
  voteStatus: VoteStatus | null = null
  buttonClicked = false

  public isVoteInProcessInput = false
  @Input() set isVoteInProcess (value: boolean) {
    this.isVoteInProcessInput = value
  }
  get isVoteInProcess (): boolean {
    return this.isVoteInProcessInput
  }

  @Output() newVoteEvent = new EventEmitter<VoteStatus>()
  constructor (
  ) { }

  vote (event: VoteStatus) {
    this.voteStatus = event
    this.newVoteEvent.emit(event)
    this.buttonClicked = true
  }
}
