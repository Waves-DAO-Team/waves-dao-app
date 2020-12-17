import {TestBed} from '@angular/core/testing'

import {StaticService} from './static.service'
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {provideApi} from '@constants';

describe('StaticService', () => {
  let service: StaticService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        // provideAppConstants(),
        provideApi(),
      ]
    })
    service = TestBed.inject(StaticService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
