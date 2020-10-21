import { ComponentFixture, TestBed } from '@angular/core/testing'

import { StylesheetPageComponent } from './stylesheet-page.component'

describe('StylesheetPageComponent', () => {
  let component: StylesheetPageComponent
  let fixture: ComponentFixture<StylesheetPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StylesheetPageComponent]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(StylesheetPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
