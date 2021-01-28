import { TestBed } from '@angular/core/testing'

import { LinkContentService } from './link-content.service'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { provideApi, provideAppConstants } from '@constants'

describe('LinkContentService', () => {
  let service: LinkContentService

  beforeEach(() => {
    // TestBed.configureTestingModule({});
    // service = TestBed.inject(LinkContentService);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        provideAppConstants(),
        provideApi()
      ]
    })
    service = TestBed.inject(LinkContentService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
