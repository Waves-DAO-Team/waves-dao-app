import { ComponentFixture, TestBed } from '@angular/core/testing'

import { StepperComponent } from './stepper.component'
import { getTranslocoModule } from '@dapp/src/app/transloco-module.spec'
import { MatStepperModule } from '@angular/material/stepper'
import { ReactiveFormsModule } from '@angular/forms'
import { MatIconModule } from '@angular/material/icon'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

describe('StepperComponent', () => {
  let component: StepperComponent
  let fixture: ComponentFixture<StepperComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        getTranslocoModule(),
        MatStepperModule,
        ReactiveFormsModule,
        MatIconModule,
        NoopAnimationsModule
      ],
      declarations: [StepperComponent]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
