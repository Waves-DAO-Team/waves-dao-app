import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BodyComponent } from './body.component'
import { provideApi, provideAppConstants } from '@constants'
import { TranslocoModule } from '@ngneat/transloco'

describe('BodyComponent', () => {
  let component: BodyComponent
  let fixture: ComponentFixture<BodyComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslocoModule],
      declarations: [BodyComponent],
      providers: [
        provideAppConstants(),
        provideApi()
      ]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
