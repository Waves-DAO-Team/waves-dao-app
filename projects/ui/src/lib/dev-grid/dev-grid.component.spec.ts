import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'

import { DevGridComponent } from './dev-grid.component'

describe('DevGridComponent', () => {
  let component: DevGridComponent
  let fixture: ComponentFixture<DevGridComponent>

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DevGridComponent]
    }).compileComponents().catch(() => {})
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(DevGridComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
