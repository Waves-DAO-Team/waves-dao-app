import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SubListComponent } from './sub-list.component'
import { provideApi, provideAppConstants } from '@constants'
import { PipesModule } from '@libs/pipes/pipes.module'
import { getTranslocoModule } from '@dapp/src/app/transloco-module.spec'
import {HttpClientTestingModule} from '@angular/common/http/testing'
import {HashModule} from '@ui/hash/hash.module'
import {TagModule} from '@ui/tag/tag.module'

describe('CardComponent', () => {
  let component: SubListComponent
  let fixture: ComponentFixture<SubListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        PipesModule,
        HashModule,
        TagModule,
        getTranslocoModule()
      ],
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
