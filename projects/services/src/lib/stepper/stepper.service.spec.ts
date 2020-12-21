import { TestBed } from '@angular/core/testing'

import { StepperService } from './stepper.service'
import { getTranslocoModule } from '@dapp/src/app/transloco-module.spec'

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
