import { ComponentFixture, TestBed } from '@angular/core/testing'

import { GuidePageComponent } from './guide-page.component'
import {HttpClientTestingModule} from '@angular/common/http/testing'
import {getTranslocoModule} from '@dapp/src/app/transloco-module.spec'
import {RouterTestingModule} from '@angular/router/testing'
import {PipesModule} from '@libs/pipes/pipes.module'
import {MatSnackBarModule} from '@angular/material/snack-bar'
import {provideApi, provideAppConstants} from '@constants'
import {ContractService} from '@services/contract/contract.service'

describe('GuidePageComponent', () => {
  let component: GuidePageComponent
  let fixture: ComponentFixture<GuidePageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuidePageComponent ],
      imports: [
        HttpClientTestingModule,
        getTranslocoModule(),
        RouterTestingModule,
        PipesModule,
        MatSnackBarModule
      ],
      providers: [
        provideAppConstants(),
        provideApi(),
        ContractService
      ],
    })
    .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(GuidePageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
