import { Component, Inject, OnInit } from '@angular/core'
import {
  APP_CONSTANTS,
  AppConstantsInterface
} from '@constants'

@Component({
  selector: 'ui-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor (
      @Inject(APP_CONSTANTS) public readonly constants: AppConstantsInterface
  ) { }

  ngOnInit (): void {
  }
}
