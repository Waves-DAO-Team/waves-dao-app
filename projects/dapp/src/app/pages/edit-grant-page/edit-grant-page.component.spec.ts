import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EditGrantPageComponent } from './edit-grant-page.component'

describe('EditGrantPageComponent', () => {
  let component: EditGrantPageComponent
  let fixture: ComponentFixture<EditGrantPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditGrantPageComponent]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGrantPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
