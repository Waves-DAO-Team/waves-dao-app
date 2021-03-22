import { TestBed } from '@angular/core/testing'

import { HashService } from './hash.service'
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {getTranslocoModule} from "@dapp/src/app/transloco-module.spec";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {provideApi, provideAppConstants} from "@constants";
import {ContractService} from "@services/contract/contract.service";
import {StorageService} from "@services/storage/storage.service";
import {StaticService} from "@services/static/static.service";

describe('HashService', () => {
  let service: HashService

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
    service = TestBed.inject(HashService)
  })


  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
