import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SubListComponent } from './sub-list.component'
import { provideApi, provideAppConstants } from '@constants'
import { PipesModule } from '@libs/pipes/pipes.module'
import { getTranslocoModule } from '@dapp/src/app/transloco-module.spec'

describe('CardComponent', () => {
  let component: SubListComponent
  let fixture: ComponentFixture<SubListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PipesModule, getTranslocoModule()],
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
