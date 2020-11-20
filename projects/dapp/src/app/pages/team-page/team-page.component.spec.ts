import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TeamPageComponent } from './team-page.component'

describe('TeamComponent', () => {
  let component: TeamPageComponent
  let fixture: ComponentFixture<TeamPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamPageComponent]
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
