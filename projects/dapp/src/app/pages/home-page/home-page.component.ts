import { ChangeDetectorRef, Component, Inject } from '@angular/core'
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
export class HomePageComponent {
  public readonly grantsVariationsList: Observable<GrantsVariationType[]> =
  this.staticService.getContactsList()

  constructor (
    public cdr: ChangeDetectorRef, // eslint-disable-line
    @Inject(APP_CONSTANTS) public readonly constants: AppConstantsInterface, // eslint-disable-line
    @Inject(API) public readonly api: AppApiInterface, // eslint-disable-line
    private readonly staticService: StaticService // eslint-disable-line
  ) { }
}
