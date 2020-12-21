import { TestBed } from '@angular/core/testing'

import { StepperService } from './stepper.service'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { getTranslocoModule } from '@dapp/src/app/transloco-module.spec'
import { MatSnackBarModule } from '@angular/material/snack-bar'

describe('StepperService', () => {
  let service: StepperService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        getTranslocoModule()
      ]
    })
    service = TestBed.inject(StepperService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
