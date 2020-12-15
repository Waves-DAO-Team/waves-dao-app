import { ComponentFixture, TestBed } from '@angular/core/testing'

import { InterhackTemplateComponent } from './interhack-template.component'

describe('DefaultTemplateComponent', () => {
  let component: InterhackTemplateComponent
  let fixture: ComponentFixture<InterhackTemplateComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InterhackTemplateComponent]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(InterhackTemplateComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
