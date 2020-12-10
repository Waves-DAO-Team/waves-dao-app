import { TestBed } from '@angular/core/testing'

import { StaticService } from './static.service'

describe('StaticService', () => {
  let service: StaticService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(StaticService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
