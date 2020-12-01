import { TestBed } from '@angular/core/testing'
import { ContractService } from './contract.service'
import { provideApi, provideAppConstants } from '@constants'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { StorageService } from '@services/storage/storage.service'

describe('ContractService', () => {
  let service: ContractService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        StorageService,
        provideAppConstants(),
        provideApi()
      ]
    })
    service = TestBed.inject(ContractService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
