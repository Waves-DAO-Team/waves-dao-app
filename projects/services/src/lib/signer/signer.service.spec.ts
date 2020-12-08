import { TestBed } from '@angular/core/testing'
import { SignerService } from './signer.service'
import { provideApi, provideAppConstants } from '@constants'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { MatSnackBarModule } from '@angular/material/snack-bar'

describe('SignerService', () => {
  let service: SignerService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, MatSnackBarModule],
      providers: [
        provideAppConstants(),
        provideApi()
      ]
    })
    service = TestBed.inject(SignerService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
