import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AddRewardPageComponent } from './add-reward-page.component'

describe('AddRewardPageComponent', () => {
  let component: AddRewardPageComponent
  let fixture: ComponentFixture<AddRewardPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddRewardPageComponent]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRewardPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
