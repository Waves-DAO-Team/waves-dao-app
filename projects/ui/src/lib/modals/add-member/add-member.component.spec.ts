import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AddMemberComponent } from './add-member.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { getTranslocoModule } from '@dapp/src/app/transloco-module.spec'
import { RouterTestingModule } from '@angular/router/testing'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { LoadingPageModule } from '@pages/loading-page/loading-page.module'
import { provideApi, provideAppConstants } from '@constants'
import { PipesModule } from '@libs/pipes/pipes.module'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { ENTITY_PAGE_PROVIDERS } from '@pages/entity-page/entity-page.providers'

describe('AddMemberComponent', () => {
  let component: AddMemberComponent
  let fixture: ComponentFixture<AddMemberComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddMemberComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatSnackBarModule,
        PipesModule,
        getTranslocoModule(),
        LoadingPageModule,
        NoopAnimationsModule
      ],
      providers: [
        provideAppConstants(),
        provideApi(),
        ENTITY_PAGE_PROVIDERS
      ]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMemberComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
