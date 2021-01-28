import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core'
import {
  API,
  APP_CONSTANTS,
  AppApiInterface,
  AppConstantsInterface
} from '@constants'
import { GrantsVariationType } from '@services/static/static.model'
import { Observable } from 'rxjs'
import { StaticService } from '@services/static/static.service'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {
  public readonly grantsVariationsList: Observable<GrantsVariationType[]> =
      this.staticService.getContactsList()

  constructor (
      public cdr: ChangeDetectorRef,
      @Inject(APP_CONSTANTS) public readonly constants: AppConstantsInterface,
      @Inject(API) public readonly api: AppApiInterface,
      private staticService: StaticService
  ) { }

  ngOnInit (): void {}

  ngOnDestroy () {}
}
