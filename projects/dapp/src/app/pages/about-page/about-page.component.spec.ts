import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AboutPageComponent } from './about-page.component'
import { getTranslocoModule } from '@dapp/src/app/transloco-module.spec'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { provideApi, provideAppConstants } from '@constants'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { ContractProviderDefine } from '@services/contract/contract-provider-factory'
import { CONTRACT } from './about-page.provider'

describe('AboutPageComponent', () => {
  let component: AboutPageComponent
  let fixture: ComponentFixture<AboutPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, getTranslocoModule(), RouterTestingModule, MatSnackBarModule],
      declarations: [AboutPageComponent],
      providers: [
        provideAppConstants(),
        provideApi(),
        ContractProviderDefine(CONTRACT)
      ]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
