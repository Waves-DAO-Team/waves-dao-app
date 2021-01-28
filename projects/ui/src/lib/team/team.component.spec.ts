import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TeamComponent } from './team.component'
import { provideApi, provideAppConstants } from '@constants'
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { getTranslocoModule } from '@dapp/src/app/transloco-module.spec'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatDialogModule } from '@angular/material/dialog'

describe('TeamComponent', () => {
  let component: TeamComponent
  let fixture: ComponentFixture<TeamComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, getTranslocoModule(), MatSnackBarModule, MatDialogModule],
      declarations: [TeamComponent],
      providers: [
        provideAppConstants(),
        provideApi()
      ]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
