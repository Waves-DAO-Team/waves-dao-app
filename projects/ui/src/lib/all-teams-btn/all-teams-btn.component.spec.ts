import {ComponentFixture, TestBed} from '@angular/core/testing'

import {AllTeamsBtnComponent} from './all-teams-btn.component'
import {HttpClientTestingModule} from '@angular/common/http/testing'
import {MatSnackBarModule} from '@angular/material/snack-bar'
import {TagModule} from '@ui/tag/tag.module'
import {getTranslocoModule} from '@dapp/src/app/transloco-module.spec'
import {RouterTestingModule} from '@angular/router/testing'
import {ActivatedRoute} from '@angular/router'
import {of} from 'rxjs'
import {provideApi, provideAppConstants} from '@constants'

describe('AllTeamsBtnComponent', () => {
  let component: AllTeamsBtnComponent
  let fixture: ComponentFixture<AllTeamsBtnComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule, TagModule, getTranslocoModule(), RouterTestingModule],
      declarations: [AllTeamsBtnComponent],
      providers: [
        provideAppConstants(),
        provideApi(),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: () => null
            })
          }
        }]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTeamsBtnComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
