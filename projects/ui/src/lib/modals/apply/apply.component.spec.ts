import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ApplyComponent } from './apply.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { provideApi, provideAppConstants } from '@constants'
import { getTranslocoModule } from '@dapp/src/app/transloco-module.spec'
import { RouterTestingModule } from '@angular/router/testing'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { DIALOG_DATA } from '@ui/dialog/dialog.tokens'
import { ReactiveFormsModule } from '@angular/forms'
import {PipesModule} from '@libs/pipes/pipes.module'

describe('ApplyComponent', () => {
  let component: ApplyComponent
  let fixture: ComponentFixture<ApplyComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplyComponent],
      imports: [MatSnackBarModule, HttpClientTestingModule, PipesModule, getTranslocoModule(), RouterTestingModule, ReactiveFormsModule],
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
