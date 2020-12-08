import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ContractMenuComponent } from './contract-menu.component'
import { provideApi, provideAppConstants } from '@constants'
import { RouterTestingModule } from '@angular/router/testing'
import { PipesModule } from '@libs/pipes/pipes.module'
import { getTranslocoModule } from '@dapp/src/app/transloco-module.spec'

describe('ContractMenuComponent', () => {
  let component: ContractMenuComponent
  let fixture: ComponentFixture<ContractMenuComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, PipesModule, getTranslocoModule()],
      declarations: [ContractMenuComponent],
      providers: [
        provideAppConstants(),
        provideApi()
      ]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractMenuComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
