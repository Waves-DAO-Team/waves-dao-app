import { TestBed } from '@angular/core/testing'
import { ContractService } from './contract.service'
import { provideApi } from '@constants'
import { HttpClientTestingModule } from '@angular/common/http/testing'

describe('ContractService', () => {
  let service: ContractService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        provideApi()
      ]
    })
    service = TestBed.inject(ContractService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
