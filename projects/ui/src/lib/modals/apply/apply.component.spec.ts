import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ApplyComponent } from './apply.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { provideApi, provideAppConstants } from '@constants'
import { getTranslocoModule } from '@dapp/src/app/transloco-module.spec'
import { RouterTestingModule } from '@angular/router/testing'
import { MatDialogModule } from '@angular/material/dialog'
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar'

describe('ApplyComponent', () => {
  let component: ApplyComponent
  let fixture: ComponentFixture<ApplyComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplyComponent],
      imports: [MatSnackBarModule, HttpClientTestingModule, getTranslocoModule(), RouterTestingModule],
      providers: [
        provideAppConstants(),
        provideApi()
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
