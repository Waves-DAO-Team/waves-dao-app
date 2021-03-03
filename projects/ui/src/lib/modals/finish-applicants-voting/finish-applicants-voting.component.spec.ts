import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FinishApplicantsVotingComponent } from './finish-applicants-voting.component'
import {HttpClientTestingModule} from '@angular/common/http/testing'
import {MatSnackBarModule} from '@angular/material/snack-bar'
import {getTranslocoModule} from '@dapp/src/app/transloco-module.spec'
import {ReactiveFormsModule} from '@angular/forms'
import {MatInputModule} from '@angular/material/input'
import {MatFormFieldModule} from '@angular/material/form-field'
import {UserService} from '@services/user/user.service'
import {provideApi, provideAppConstants} from '@constants'
import {DIALOG_DATA} from '@ui/dialog/dialog.tokens'
import {NoopAnimationsModule} from '@angular/platform-browser/animations'

describe('FinishApplicantsVotingComponent', () => {
  let component: FinishApplicantsVotingComponent
  let fixture: ComponentFixture<FinishApplicantsVotingComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,
        getTranslocoModule(),
        ReactiveFormsModule,
        NoopAnimationsModule
      ],
      declarations: [ FinishApplicantsVotingComponent ],
      providers: [
        UserService,
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
    fixture = TestBed.createComponent(FinishApplicantsVotingComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
