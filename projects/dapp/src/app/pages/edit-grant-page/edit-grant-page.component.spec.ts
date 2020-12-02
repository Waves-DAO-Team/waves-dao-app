import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EditGrantPageComponent } from './edit-grant-page.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { provideApi, provideAppConstants } from '@constants'
import { getTranslocoModule } from '../../transloco-module.spec'
import { ReactiveFormsModule } from '@angular/forms'
import { MatSnackBarModule } from '@angular/material/snack-bar'

describe('EditGrantPageComponent', () => {
  let component: EditGrantPageComponent
  let fixture: ComponentFixture<EditGrantPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, getTranslocoModule(), ReactiveFormsModule, MatSnackBarModule],
      declarations: [EditGrantPageComponent],
      providers: [
        provideAppConstants(),
        provideApi()
      ]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGrantPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
