import { ComponentFixture, TestBed } from '@angular/core/testing'

import { StepperComponent } from './stepper.component'
import { getTranslocoModule } from '@dapp/src/app/transloco-module.spec'

describe('StepperComponent', () => {
  let component: StepperComponent
  let fixture: ComponentFixture<StepperComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [getTranslocoModule()],
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
