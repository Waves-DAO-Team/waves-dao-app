import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AddTaskDetailsComponent } from './add-task-details.component'
import { provideApi, provideAppConstants } from '@constants'
import { ContractService } from '@services/contract/contract.service'
import { DIALOG_DATA } from '@ui/dialog/dialog.tokens'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { getTranslocoModule } from '@dapp/src/app/transloco-module.spec'
import { ReactiveFormsModule } from '@angular/forms'

describe('AddTaskDetailsComponent', () => {
  let component: AddTaskDetailsComponent
  let fixture: ComponentFixture<AddTaskDetailsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, MatSnackBarModule, getTranslocoModule(), ReactiveFormsModule],
      providers: [
        provideAppConstants(),
        provideApi(),
        {
          provide: DIALOG_DATA,
          useValue: {}
        }
      ],
      declarations: [AddTaskDetailsComponent]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskDetailsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
