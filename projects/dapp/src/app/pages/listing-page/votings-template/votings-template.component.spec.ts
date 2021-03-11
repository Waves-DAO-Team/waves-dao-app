import { ComponentFixture, TestBed } from '@angular/core/testing'

import { VotingsTemplateComponent } from './votings-template.component'
import {MatDialogModule} from '@angular/material/dialog'
import {HttpClientTestingModule} from '@angular/common/http/testing'
import {PipesModule} from '@libs/pipes/pipes.module'
import {getTranslocoModule} from '@dapp/src/app/transloco-module.spec'
import {RouterTestingModule} from '@angular/router/testing'
import {MatSnackBarModule} from '@angular/material/snack-bar'
import {ListingModule} from '@ui/listing/listing.module'
import {provideApi, provideAppConstants} from '@constants'

describe('VotingsTemplateComponent', () => {
  let component: VotingsTemplateComponent
  let fixture: ComponentFixture<VotingsTemplateComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        HttpClientTestingModule,
        PipesModule,
        getTranslocoModule(),
        RouterTestingModule,
        MatSnackBarModule,
        ListingModule
      ],
      declarations: [VotingsTemplateComponent],
      providers: [
        provideAppConstants(),
        provideApi()
      ]
    })
    .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingsTemplateComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
