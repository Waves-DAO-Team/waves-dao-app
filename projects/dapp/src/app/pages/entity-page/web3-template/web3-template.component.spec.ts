import { ComponentFixture, TestBed } from '@angular/core/testing'

import { Web3TemplateComponent } from './default-template.component'

describe('DefaultTemplateComponent', () => {
  let component: Web3TemplateComponent
  let fixture: ComponentFixture<Web3TemplateComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Web3TemplateComponent]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(Web3TemplateComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
