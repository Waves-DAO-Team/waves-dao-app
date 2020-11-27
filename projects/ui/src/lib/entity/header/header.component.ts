import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ui-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() status: string = ''
  @Input() title: string = ''
  @Input() reward: number = 0

  constructor() { }

  ngOnInit(): void {
  }

}
