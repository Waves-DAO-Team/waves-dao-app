import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AboutPageComponent } from './about-page.component'
import { getTranslocoModule } from '@dapp/src/app/transloco-module.spec'

describe('AboutPageComponent', () => {
  let component: AboutPageComponent
  let fixture: ComponentFixture<AboutPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [getTranslocoModule()],
      declarations: [AboutPageComponent]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
