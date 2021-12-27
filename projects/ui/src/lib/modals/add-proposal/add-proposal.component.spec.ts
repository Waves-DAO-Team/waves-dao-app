import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AddProposalComponent } from './add-proposal.component'
import {HttpClientTestingModule} from '@angular/common/http/testing'
import {RouterTestingModule} from '@angular/router/testing'
import {MatSnackBarModule} from '@angular/material/snack-bar'
import {PipesModule} from '@libs/pipes/pipes.module'
import {getTranslocoModule} from '@dapp/src/app/transloco-module.spec'
import {LoadingPageModule} from '@pages/loading-page/loading-page.module'
import {NoopAnimationsModule} from '@angular/platform-browser/animations'
import {MatDialogModule} from '@angular/material/dialog'
import {ReactiveFormsModule} from '@angular/forms'
import {provideApi, provideAppConstants} from '@constants'
import {DIALOG_DATA} from '@ui/dialog/dialog.tokens'

describe('AddProposalComponent', () => {
  let component: AddProposalComponent
  let fixture: ComponentFixture<AddProposalComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProposalComponent ],
      imports: [
        MatDialogModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MatSnackBarModule,
        PipesModule,
        getTranslocoModule(),
        LoadingPageModule,
        NoopAnimationsModule,
        MatDialogModule,
        ReactiveFormsModule
      ],
      providers: [
        provideAppConstants(),
        provideApi(),
        {
          provide: DIALOG_DATA,
          useValue: {}
        }
      ]
    })
    .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProposalComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
