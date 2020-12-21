import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ApplyComponent } from './apply.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { APP_CONSTANTS, provideApi, provideAppConstants } from '@constants'
import { getTranslocoModule } from '@dapp/src/app/transloco-module.spec'
import { RouterTestingModule } from '@angular/router/testing'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { environment } from '@dapp/src/environments/environment'
import { DIALOG_DATA } from '@ui/dialog/dialog.tokens'
import { ReactiveFormsModule } from '@angular/forms'

describe('ApplyComponent', () => {
  let component: ApplyComponent
  let fixture: ComponentFixture<ApplyComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplyComponent],
      imports: [MatSnackBarModule, HttpClientTestingModule, getTranslocoModule(), RouterTestingModule, ReactiveFormsModule],
      providers: [
        provideAppConstants(),
        provideApi(),
        {
          provide: DIALOG_DATA,
          useValue: {}
        }
      ]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
