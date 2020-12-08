import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FooterComponent } from './footer.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { provideApi, provideAppConstants } from '@constants'
import { RouterTestingModule } from '@angular/router/testing'
import { getTranslocoModule } from '@dapp/src/app/transloco-module.spec'

describe('FooterComponent', () => {
  let component: FooterComponent
  let fixture: ComponentFixture<FooterComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [getTranslocoModule(), HttpClientTestingModule, RouterTestingModule],
      declarations: [FooterComponent],
      providers: [
        provideAppConstants(),
        provideApi()
      ]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
