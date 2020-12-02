import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MasterSettingPageComponent } from './master-setting-page.component'
import { provideApi, provideAppConstants } from '@constants'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { getTranslocoModule } from '@dapp/src/app/transloco-module.spec'
import { ReactiveFormsModule } from '@angular/forms'
import { MatSnackBarModule } from '@angular/material/snack-bar'

describe('MasterSettingPageComponent', () => {
  let component: MasterSettingPageComponent
  let fixture: ComponentFixture<MasterSettingPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [getTranslocoModule(), HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule, MatSnackBarModule],
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
