import { ComponentFixture, TestBed } from '@angular/core/testing'


import { HttpClientTestingModule } from '@angular/common/http/testing'
import { getTranslocoModule } from '@dapp/src/app/transloco-module.spec'
import { RouterTestingModule } from '@angular/router/testing'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { LoadingPageModule } from '@pages/loading-page/loading-page.module'
import { provideApi, provideAppConstants} from '@constants'
import { PipesModule } from '@libs/pipes/pipes.module'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { ENTITY_PAGE_PROVIDERS } from '@pages/entity-page/entity-page.providers'
import {DIALOG_DATA} from '@ui/dialog/dialog.tokens'
import {
  MatDialogModule,
} from '@angular/material/dialog'
import {ReactiveFormsModule} from '@angular/forms'
import {AddMemberComponent} from '@ui/modals/add-member/add-member.component'

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
        NoopAnimationsModule,
        MatDialogModule,
        ReactiveFormsModule
      ],
      providers: [
        provideAppConstants(),
        provideApi(),
        ENTITY_PAGE_PROVIDERS,
        {
          provide: DIALOG_DATA,
          useValue: {}
        }
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
