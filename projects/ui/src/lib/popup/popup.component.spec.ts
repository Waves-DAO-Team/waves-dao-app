import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PopupComponent } from './popup.component'
import { provideApi } from '@constants'
import { PopupService } from '@services/popup/popup.service'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

describe('PopupComponent', () => {
  let component: PopupComponent
  let fixture: ComponentFixture<PopupComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      declarations: [PopupComponent],
      providers: [PopupService, provideApi()]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
