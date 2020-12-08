import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EntityPageComponent } from './entity-page.component'
import { provideApi, provideAppConstants } from '@constants'
import { ContractService } from '@services/contract/contract.service'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { PipesModule } from '@libs/pipes/pipes.module'
import { getTranslocoModule } from '../../transloco-module.spec'
import { LoadingPageModule } from '@pages/loading-page/loading-page.module'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { ENTITY_PAGE_PROVIDERS } from './entity-page.providers'

describe('EntityPageComponent', () => {
  let component: EntityPageComponent
  let fixture: ComponentFixture<EntityPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatSnackBarModule,
        PipesModule,
        getTranslocoModule(),
        LoadingPageModule,
        NoopAnimationsModule
      ],
      declarations: [EntityPageComponent],
      providers: [
        provideAppConstants(),
        ContractService,
        provideApi(),
        ENTITY_PAGE_PROVIDERS
      ]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
