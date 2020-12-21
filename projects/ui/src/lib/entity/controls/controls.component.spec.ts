import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ControlsComponent } from './controls.component'
import { provideApi, provideAppConstants } from '@constants'
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { getTranslocoModule } from '@dapp/src/app/transloco-module.spec'
import { ReactiveFormsModule } from '@angular/forms'
import { MatDialogModule } from '@angular/material/dialog'

describe('ControlsComponent', () => {
  let component: ControlsComponent
  let fixture: ComponentFixture<ControlsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        getTranslocoModule(),
        ReactiveFormsModule,
        MatDialogModule
      ],
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
