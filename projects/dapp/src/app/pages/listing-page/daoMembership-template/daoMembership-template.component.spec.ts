import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DaoMembershipTemplateComponent } from './daoMembership-template.component'
import {MatDialogModule} from '@angular/material/dialog'
import {HttpClientTestingModule} from '@angular/common/http/testing'
import {PipesModule} from '@libs/pipes/pipes.module'
import {getTranslocoModule} from '@dapp/src/app/transloco-module.spec'
import {RouterTestingModule} from '@angular/router/testing'
import {MatSnackBarModule} from '@angular/material/snack-bar'
import {ListingModule} from '@ui/listing/listing.module'
import {provideApi, provideAppConstants} from '@constants'
import {TagModule} from '@ui/tag/tag.module'

describe('VotingsTemplateComponent', () => {
  let component: DaoMembershipTemplateComponent
  let fixture: ComponentFixture<DaoMembershipTemplateComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        HttpClientTestingModule,
        PipesModule,
        getTranslocoModule(),
        RouterTestingModule,
        MatSnackBarModule,
        ListingModule,
        TagModule,
      ],
      declarations: [DaoMembershipTemplateComponent],
      providers: [
        provideAppConstants(),
        provideApi()
      ]
    })
    .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DaoMembershipTemplateComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
