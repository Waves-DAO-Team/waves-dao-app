import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'

type VoteStatus = 'like' | 'dislike';

@Component({
  selector: 'ui-vote-for-task',
  templateUrl: './vote-for-task.component.html',
  styleUrls: ['./vote-for-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VoteForTaskComponent {
  public _isVoteInProcess = false;
  voteStatus: VoteStatus | null = null;
  buttonClicked = false;
  @Input() isShow = false
  @Input() isVote = false
  @Input() set isVoteInProcess (value: boolean) {
    this._isVoteInProcess = value
  }

  get isVoteInProcess () {
    return this._isVoteInProcess
  }

  @Output() newVoteEvent = new EventEmitter<VoteStatus>();
  constructor (
  ) { }

  vote (event: VoteStatus) {
    this.voteStatus = event
    this.newVoteEvent.emit(event)
    this.buttonClicked = true
  }
}
