import {ComponentFixture, TestBed} from '@angular/core/testing'

import {ScoreListComponent} from './score-list.component'
import {PipesModule} from '@libs/pipes/pipes.module'
import {HashModule} from '@ui/hash/hash.module'
import {MatTooltipModule} from '@angular/material/tooltip'
import {VotingSquareModule} from '@ui/voting-square/voting-square.module'
import {StatusesModule} from '@ui/statuses/statuses.module'

describe('ScoreListComponent', () => {
  let component: ScoreListComponent
  let fixture: ComponentFixture<ScoreListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScoreListComponent],
      imports: [
        PipesModule,
        HashModule,
        MatTooltipModule,
        VotingSquareModule,
        StatusesModule,
      ]
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
