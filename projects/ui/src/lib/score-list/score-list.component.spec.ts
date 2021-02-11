import {ComponentFixture, TestBed} from '@angular/core/testing'

import {ScoreListComponent} from './score-list.component'
import {PipesModule} from '@libs/pipes/pipes.module'

describe('ScoreListComponent', () => {
  let component: ScoreListComponent
  let fixture: ComponentFixture<ScoreListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScoreListComponent],
      imports: [PipesModule,]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
