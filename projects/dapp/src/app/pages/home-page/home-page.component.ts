import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core'
import {
  API,
  APP_CONSTANTS,
  AppApiInterface,
  AppConstantsInterface
} from '@constants'
import { GrantsVariationType } from '@services/contract/contract.model'
import { ContractService } from '@services/contract/contract.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {
  public readonly grantsVariationsList: Observable<GrantsVariationType[]> =
      this.contractService.getContactsList()

  constructor (
      public cdr: ChangeDetectorRef,
      @Inject(APP_CONSTANTS) public readonly constants: AppConstantsInterface,
      @Inject(API) public readonly api: AppApiInterface,
      private contractService: ContractService
  ) { }

  ngOnInit (): void {}

  ngOnDestroy () {}
}
