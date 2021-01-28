import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DialogComponent } from './dialog.component'
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

describe('DialogComponent', () => {
  let component: DialogComponent
  let fixture: ComponentFixture<DialogComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: {} }
      ],
      declarations: [DialogComponent],
      imports: [MatDialogModule]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
