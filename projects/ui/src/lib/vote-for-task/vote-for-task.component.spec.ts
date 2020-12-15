import { ComponentFixture, TestBed } from '@angular/core/testing'

import { VoteForTaskComponent } from './vote-for-task.component'

describe('VoteForTaskComponent', () => {
  let component: VoteForTaskComponent
  let fixture: ComponentFixture<VoteForTaskComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VoteForTaskComponent]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteForTaskComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
