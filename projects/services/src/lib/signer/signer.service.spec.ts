import { TestBed } from '@angular/core/testing'
import { SignerService } from './signer.service'
import { provideApi } from '@constants'
import { HttpClientTestingModule } from '@angular/common/http/testing'

describe('SignerService', () => {
  let service: SignerService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        provideApi()
      ]
    })
    service = TestBed.inject(SignerService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
