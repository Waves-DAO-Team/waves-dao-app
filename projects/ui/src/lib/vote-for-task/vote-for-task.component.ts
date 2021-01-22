import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'

type VoteStatus = 'like' | 'dislike';

@Component({
  selector: 'ui-vote-for-task',
  templateUrl: './vote-for-task.component.html',
  styleUrls: ['./vote-for-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VoteForTaskComponent {
  voteStatus: VoteStatus | null = null;
  buttonClicked = false;
  @Input() isShow = false
  @Input() isVote = false

  @Output() newVoteEvent = new EventEmitter<VoteStatus>();
  constructor () { }
  vote (event: VoteStatus) {
    this.voteStatus = event
    this.newVoteEvent.emit(event)
    this.buttonClicked = true
  }
}
