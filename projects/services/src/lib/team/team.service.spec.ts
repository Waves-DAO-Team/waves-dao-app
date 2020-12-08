import { TestBed } from '@angular/core/testing'

import { TeamService } from './team.service'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { provideApi, provideAppConstants } from '@constants'
import { RouterTestingModule } from '@angular/router/testing'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { TranslocoModule } from '@ngneat/transloco'

describe('TeamService', () => {
  let service: TeamService

  beforeEach(() => {
    // TestBed.configureTestingModule({});
    // service = TestBed.inject(TeamService);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, MatSnackBarModule, TranslocoModule],
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
