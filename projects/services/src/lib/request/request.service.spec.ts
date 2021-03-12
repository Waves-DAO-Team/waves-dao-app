import { TestBed } from '@angular/core/testing'

import { RequestService } from './request.service'
import {HttpClientTestingModule} from '@angular/common/http/testing'
import {RouterTestingModule} from '@angular/router/testing'
import {MatSnackBarModule} from '@angular/material/snack-bar'
import {provideApi, provideAppConstants} from '@constants'

describe('RequestService', () => {
  let service: RequestService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, MatSnackBarModule],
      providers: [
        provideApi(),
        provideAppConstants()
      ]
    })
    service = TestBed.inject(RequestService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
