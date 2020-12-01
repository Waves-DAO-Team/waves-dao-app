import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ControlsComponent } from './controls.component'
import { provideApi, provideAppConstants } from '@constants'
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { getTranslocoModule } from '@dapp/src/app/transloco-module.spec'

describe('ControlsComponent', () => {
  let component: ControlsComponent
  let fixture: ComponentFixture<ControlsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, MatSnackBarModule, getTranslocoModule()],
      declarations: [ControlsComponent],
      providers: [
        provideAppConstants(),
        provideApi()
      ]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
