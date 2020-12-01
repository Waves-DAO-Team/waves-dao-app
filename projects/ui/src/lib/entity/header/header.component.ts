import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'ui-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() status = ''
  @Input() title = ''
  @Input() reward = 0

  constructor () { }

  ngOnInit (): void {
  }
}