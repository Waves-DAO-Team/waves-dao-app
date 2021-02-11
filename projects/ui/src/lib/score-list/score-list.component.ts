import {Component, Input, OnInit} from '@angular/core';
import {IScore} from "@services/interface";

@Component({
  selector: 'ui-score-list',
  templateUrl: './score-list.component.html',
  styleUrls: ['./score-list.component.scss']
})
export class ScoreListComponent {

  @Input() list: IScore.IUnit[] = []

}
