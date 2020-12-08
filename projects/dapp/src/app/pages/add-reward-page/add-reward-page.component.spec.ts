import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AddRewardPageComponent } from './add-reward-page.component'
import { provideApi, provideAppConstants } from '@constants'
import { RouterTestingModule } from '@angular/router/testing'
import { getTranslocoModule } from '@dapp/src/app/transloco-module.spec'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { ContractProviderDefine } from '@services/contract/contract-provider-factory'
import { CONTRACT } from './add-reward-page.provider'

describe('AddRewardPageComponent', () => {
  let component: AddRewardPageComponent
  let fixture: ComponentFixture<AddRewardPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [getTranslocoModule(), RouterTestingModule, HttpClientTestingModule, MatSnackBarModule],
      declarations: [AddRewardPageComponent],
      providers: [
        provideAppConstants(),
        provideApi(),
        ContractProviderDefine(CONTRACT)
      ]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRewardPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
