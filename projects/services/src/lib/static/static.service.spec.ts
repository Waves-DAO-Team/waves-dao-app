import { TestBed } from '@angular/core/testing'

import { StaticService } from './static.service'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { provideApi, provideAppConstants } from '@constants'
import { ContractService } from '@services/contract/contract.service'
import { StorageService } from '@services/storage/storage.service'
import { getTranslocoModule } from '@dapp/src/app/transloco-module.spec'
import { RouterTestingModule } from '@angular/router/testing'
import { MatSnackBarModule } from '@angular/material/snack-bar'

describe('StaticService', () => {
  let service: StaticService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        getTranslocoModule(),
        MatSnackBarModule
      ],
      providers: [
        provideAppConstants(),
        provideApi(),
        ContractService,
        StorageService
      ]
    })
    service = TestBed.inject(StaticService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
