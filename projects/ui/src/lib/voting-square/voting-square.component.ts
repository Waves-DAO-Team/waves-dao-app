import {Component, EventEmitter, Input, Output} from '@angular/core'
import {VoteEventInterface} from '@pages/entity-page/entity.interface'

@Component({
  selector: 'ui-voting-square',
  templateUrl: './voting-square.component.html',
  styleUrls: ['./voting-square.component.scss']
})
export class VotingSquareComponent {

  @Input() isShowResult = false
  @Input() isCanVote = false
  @Input() votes = 0
  @Input() teamId = ''
  @Output() voteEvent = new EventEmitter<VoteEventInterface>()

  public voteDown (): void {
    this.voteEvent.emit( {voteValue: 'dislike', teamIdentifier: this.teamId})
  }

  public voteUp (): void {
    this.voteEvent.emit( {voteValue: 'like', teamIdentifier: this.teamId})
  }

}
