import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DefaultTemplateComponent } from './default-template.component'
import { MatDialogModule } from '@angular/material/dialog'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { provideApi, provideAppConstants } from '@constants'
import { getTranslocoModule } from '@dapp/src/app/transloco-module.spec'
import { RouterTestingModule } from '@angular/router/testing'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { ListingModule } from '@ui/listing/listing.module'
import {PipesModule} from '@libs/pipes/pipes.module'

describe('DefaultTemplateComponent', () => {
  let component: DefaultTemplateComponent
  let fixture: ComponentFixture<DefaultTemplateComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PipesModule,
        MatDialogModule,
        HttpClientTestingModule,
        getTranslocoModule(),
        RouterTestingModule,
        MatSnackBarModule,
        ListingModule
      ],
      providers: [
        provideAppConstants(),
        provideApi()
      ],
      declarations: [DefaultTemplateComponent]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultTemplateComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
