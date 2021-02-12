import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AllTeamsPageComponent } from './all-teams-page.component'
import {ActivatedRoute} from '@angular/router'
import {of} from 'rxjs'
import {HttpClientTestingModule} from '@angular/common/http/testing'
import {MatSnackBarModule} from '@angular/material/snack-bar'
import {TagModule} from '@ui/tag/tag.module'
import {getTranslocoModule} from '@dapp/src/app/transloco-module.spec'
import {RouterTestingModule} from '@angular/router/testing'
import {StorageService} from '@services/storage/storage.service'
import {provideApi, provideAppConstants} from '@constants'
import {ScoreListModule} from '@ui/score-list/score-list.module'

describe('AllTeamsPageComponent', () => {
  let component: AllTeamsPageComponent
  let fixture: ComponentFixture<AllTeamsPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule, TagModule, getTranslocoModule(), RouterTestingModule, ScoreListModule],
      declarations: [ AllTeamsPageComponent ],
      providers: [
        StorageService,
        provideAppConstants(),
        provideApi(),
        {
        provide: ActivatedRoute,
        useValue: {
          params: of({
            get: () => null
          }),
          paramMap: of({
            get: () => null
          })
        }
      }]
    })
    .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTeamsPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
