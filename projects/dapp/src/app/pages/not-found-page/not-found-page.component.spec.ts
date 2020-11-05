import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NotFoundPageComponent } from './not-found-page.component'
import { TranslocoModule } from '@ngneat/transloco'

describe('NotFoundPageComponent', () => {
  let component: NotFoundPageComponent
  let fixture: ComponentFixture<NotFoundPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslocoModule],
      declarations: [NotFoundPageComponent]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
