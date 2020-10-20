import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EntityPageComponent } from './entity-page.component'

describe('EntityPageComponent', () => {
  let component: EntityPageComponent
  let fixture: ComponentFixture<EntityPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntityPageComponent]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
