import { ComponentFixture, TestBed } from '@angular/core/testing'

import { LoadingPageComponent } from './loading-page.component'

describe('LoadingPageComponent', () => {
  let component: LoadingPageComponent
  let fixture: ComponentFixture<LoadingPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadingPageComponent]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
