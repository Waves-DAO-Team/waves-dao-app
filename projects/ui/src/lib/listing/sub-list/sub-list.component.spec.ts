import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SubListComponent } from './sub-list.component'
import { provideApi, provideAppConstants } from '@constants'

describe('CardComponent', () => {
  let component: SubListComponent
  let fixture: ComponentFixture<SubListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubListComponent],
      providers: [
        provideAppConstants(),
        provideApi()
      ]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SubListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
