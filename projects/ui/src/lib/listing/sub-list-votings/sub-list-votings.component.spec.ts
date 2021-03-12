import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SubListVotingsComponent } from './sub-list-votings.component'
import { provideApi, provideAppConstants } from '@constants'
import { PipesModule } from '@libs/pipes/pipes.module'
import { getTranslocoModule } from '@dapp/src/app/transloco-module.spec'

describe('CardComponent', () => {
  let component: SubListVotingsComponent
  let fixture: ComponentFixture<SubListVotingsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PipesModule, getTranslocoModule()],
      declarations: [SubListVotingsComponent],
      providers: [
        provideAppConstants(),
        provideApi()
      ]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SubListVotingsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
