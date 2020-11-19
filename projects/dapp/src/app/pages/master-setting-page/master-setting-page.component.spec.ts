import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MasterSettingPageComponent } from './master-setting-page.component'
import { TranslocoModule } from '@ngneat/transloco'
import { provideApi, provideAppConstants } from '@constants'
import { ContractService } from '@services/contract/contract.service'
import { HttpClient } from '@angular/common/http'
import { HttpClientTestingModule } from '@angular/common/http/testing'

describe('MasterSettingPageComponent', () => {
  let component: MasterSettingPageComponent
  let fixture: ComponentFixture<MasterSettingPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslocoModule, HttpClientTestingModule!],
      declarations: [MasterSettingPageComponent],
      providers: [
        provideAppConstants(),
        provideApi()
      ]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterSettingPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
