import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DisruptiveTemplateComponent } from './disruptive-template.component'

describe('DefaultTemplateComponent', () => {
  let component: DisruptiveTemplateComponent
  let fixture: ComponentFixture<DisruptiveTemplateComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisruptiveTemplateComponent]
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
