import {Component, Input, OnInit} from '@angular/core'

@Component({
  selector: 'ui-statuses',
  templateUrl: './statuses.component.html',
  styleUrls: ['./statuses.component.scss']
})
export class StatusesComponent implements OnInit {

  @Input() isHasSolution: boolean | null = null
  @Input() isRejected: boolean | null = null

  constructor () { }

  ngOnInit (): void {
  }

}
