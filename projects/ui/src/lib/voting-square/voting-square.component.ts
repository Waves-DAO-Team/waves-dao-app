import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {VoteEventInterface, VoteTeamEventInterface} from "@pages/entity-page/entity.interface";

@Component({
  selector: 'ui-voting-square',
  templateUrl: './voting-square.component.html',
  styleUrls: ['./voting-square.component.scss']
})
export class VotingSquareComponent {

  @Input() isShowResult: boolean = false
  @Input() isCanVote: boolean = false
  @Input() votes: number = 0
  @Input() teamId: string = ''
  @Output() voteEvent = new EventEmitter<VoteEventInterface>()

  public voteDown(): void {
    console.log({voteValue: 'dislike', teamIdentifier: this.teamId})
    this.voteEvent.emit( {voteValue: 'dislike', teamIdentifier: this.teamId})
  }

  public voteUp(): void {
    this.voteEvent.emit( {voteValue: 'like', teamIdentifier: this.teamId})
  }

}
