import {TestBed} from '@angular/core/testing'

import {StaticService} from './static.service'
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {ListingModule} from "@ui/listing/listing.module";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {getTranslocoModule} from "@dapp/src/app/transloco-module.spec";
import {LoadingPageModule} from "@pages/loading-page/loading-page.module";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {provideApi, provideAppConstants} from "@constants";
import {ContractService} from "@services/contract/contract.service";

describe('StaticService', () => {
  let service: StaticService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        // provideAppConstants(),
        provideApi(),
      ]
    })
    service = TestBed.inject(StaticService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
