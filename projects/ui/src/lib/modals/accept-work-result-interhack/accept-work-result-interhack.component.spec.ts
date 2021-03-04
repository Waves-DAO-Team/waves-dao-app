import { ComponentFixture, TestBed } from '@angular/core/testing'
import { getTranslocoModule } from '@dapp/src/app/transloco-module.spec'
import { ReactiveFormsModule } from '@angular/forms'
import { provideApi, provideAppConstants } from '@constants'
import { DIALOG_DATA } from '@ui/dialog/dialog.tokens'
import {AcceptWorkResultInterhackComponent} from '@ui/modals/accept-work-result-interhack/accept-work-result-interhack.component'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

describe('AcceptWorkResultInterhackComponent', () => {
  let component: AcceptWorkResultInterhackComponent
  let fixture: ComponentFixture<AcceptWorkResultInterhackComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatFormFieldModule, MatInputModule, getTranslocoModule(), ReactiveFormsModule, NoopAnimationsModule],
      providers: [
        provideAppConstants(),
        provideApi(),
        {
          provide: DIALOG_DATA,
          useValue: {}
        }
      ],
      declarations: [AcceptWorkResultInterhackComponent]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptWorkResultInterhackComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
