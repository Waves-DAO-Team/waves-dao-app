import { TestBed } from '@angular/core/testing'
import { SignerService } from './signer.service'
import { provideApi } from '@constants'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing'

describe('SignerService', () => {
  let service: SignerService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
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
