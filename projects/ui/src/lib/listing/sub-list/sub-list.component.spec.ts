import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SubListComponent } from './card.component'

describe('CardComponent', () => {
  let component: SubListComponent
  let fixture: ComponentFixture<SubListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubListComponent]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SubListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
