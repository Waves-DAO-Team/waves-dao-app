import {Component, Input, OnInit} from '@angular/core'

@Component({
  selector: 'ui-hash',
  templateUrl: './hash.component.html',
  styleUrls: ['./hash.component.scss']
})
export class HashComponent implements OnInit {

  @Input() public readonly status: boolean | null = null

  constructor () { }

  ngOnInit (): void {}

}
