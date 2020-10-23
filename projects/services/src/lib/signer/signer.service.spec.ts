import { TestBed } from '@angular/core/testing'
import { SignerService } from './signer.service'

describe('SignerService', () => {
  let service: SignerService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(SignerService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
