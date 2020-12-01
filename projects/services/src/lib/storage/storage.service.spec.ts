import { TestBed } from '@angular/core/testing'

import { StorageService } from './storage.service'
import { provideAppConstants } from '@constants'

describe('StorageService', () => {
  let service: StorageService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideAppConstants()
      ]
    })
    service = TestBed.inject(StorageService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
