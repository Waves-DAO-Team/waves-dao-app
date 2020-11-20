import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TeamPageComponent } from './team-page.component'
import { provideApi, provideAppConstants } from '@constants'

describe('TeamComponent', () => {
  let component: TeamPageComponent
  let fixture: ComponentFixture<TeamPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamPageComponent],
      providers: [
        provideAppConstants(),
        provideApi()
      ]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
