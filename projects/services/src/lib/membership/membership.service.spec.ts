import { TestBed } from '@angular/core/testing'

import { MembershipService } from './membership.service'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { provideApi, provideAppConstants } from '@constants'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { getTranslocoModule } from '@dapp/src/app/transloco-module.spec'
import { RouterTestingModule } from '@angular/router/testing'

describe('MembershipService', () => {
  let service: MembershipService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule, getTranslocoModule(), RouterTestingModule, HttpClientTestingModule],
      declarations: [],
      providers: [
        provideAppConstants(),
        provideApi()
      ]
    })
    service = TestBed.inject(MembershipService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
