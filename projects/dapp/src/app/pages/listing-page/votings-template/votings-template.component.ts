import {Component, Input, OnInit} from '@angular/core'
import {GrantsVariationType} from '@services/static/static.model'

@Component({
  selector: 'app-votings-template',
  templateUrl: './votings-template.component.html',
  styleUrls: ['./votings-template.component.scss']
})
export class VotingsTemplateComponent implements OnInit {

  @Input() public readonly contract!: GrantsVariationType

  constructor () { }

  ngOnInit (): void {
  }

}
