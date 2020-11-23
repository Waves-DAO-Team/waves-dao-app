import { TestBed } from '@angular/core/testing'

import { TeamService } from './team.service'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { provideApi, provideAppConstants } from '@constants'
import { ContractService } from '@services/contract/contract.service'

describe('TeamService', () => {
  let service: TeamService

  beforeEach(() => {
    // TestBed.configureTestingModule({});
    // service = TestBed.inject(TeamService);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        provideAppConstants(),
        provideApi()
      ]
    })
    service = TestBed.inject(TeamService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
