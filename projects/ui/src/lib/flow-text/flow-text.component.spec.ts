import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FlowTextComponent } from './flow-text.component'

describe('FlowTextComponent', () => {
  let component: FlowTextComponent
  let fixture: ComponentFixture<FlowTextComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlowTextComponent ]
    })
    .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowTextComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
