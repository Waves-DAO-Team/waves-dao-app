import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CreateEntityPageComponent } from './create-entity-page.component'

describe('CreateEntityPageComponent', () => {
  let component: CreateEntityPageComponent
  let fixture: ComponentFixture<CreateEntityPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateEntityPageComponent]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEntityPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
