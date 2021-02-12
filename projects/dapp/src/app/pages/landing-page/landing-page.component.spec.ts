import { ComponentFixture, TestBed } from '@angular/core/testing'

import { LandingPageComponent } from './landing-page.component'
import {HttpClientTestingModule} from '@angular/common/http/testing'
import {getTranslocoModule} from '@dapp/src/app/transloco-module.spec'
import {RouterTestingModule} from '@angular/router/testing'
import {PipesModule} from '@libs/pipes/pipes.module'
import {MatSnackBarModule} from '@angular/material/snack-bar'
import {provideApi, provideAppConstants} from '@constants'
import {MatTabsModule} from '@angular/material/tabs'
import {NoopAnimationsModule} from '@angular/platform-browser/animations'
import {LinkContentModule} from '@services/link-content/link-content.module'

describe('LandingPageComponent', () => {
  let component: LandingPageComponent
  let fixture: ComponentFixture<LandingPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        getTranslocoModule(),
        RouterTestingModule,
        PipesModule,
        MatSnackBarModule,
        MatTabsModule,
        NoopAnimationsModule,
        LinkContentModule
      ],
      providers: [
        provideAppConstants(),
        provideApi()
      ],
      declarations: [ LandingPageComponent ]
    })
    .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
