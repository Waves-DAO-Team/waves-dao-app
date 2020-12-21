import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DisruptiveTemplateComponent } from './disruptive-template.component'
import { MatDialogModule } from '@angular/material/dialog'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { provideApi, provideAppConstants } from '@constants'
import { getTranslocoModule } from '@dapp/src/app/transloco-module.spec'
import { RouterTestingModule } from '@angular/router/testing'
import { MatSnackBarModule } from '@angular/material/snack-bar'

describe('DisruptiveTemplateComponent', () => {
  let component: DisruptiveTemplateComponent
  let fixture: ComponentFixture<DisruptiveTemplateComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, HttpClientTestingModule, getTranslocoModule(), RouterTestingModule, MatSnackBarModule],
      declarations: [DisruptiveTemplateComponent],
      providers: [
        provideAppConstants(),
        provideApi()
      ]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DisruptiveTemplateComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
