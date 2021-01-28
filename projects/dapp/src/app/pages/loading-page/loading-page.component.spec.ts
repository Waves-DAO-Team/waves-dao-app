import { ComponentFixture, TestBed } from '@angular/core/testing'

import { LoadingPageComponent } from './loading-page.component'
import { getTranslocoModule } from '@dapp/src/app/transloco-module.spec'

describe('LoadingPageComponent', () => {
  let component: LoadingPageComponent
  let fixture: ComponentFixture<LoadingPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [getTranslocoModule()],
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
