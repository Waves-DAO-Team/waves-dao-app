import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AddRewardComponent } from './add-reward.component'
import { provideApi, provideAppConstants } from '@constants'
import { DIALOG_DATA } from '@ui/dialog/dialog.tokens'
import { getTranslocoModule } from '@dapp/src/app/transloco-module.spec'
import { ReactiveFormsModule } from '@angular/forms'

describe('AddRewardComponent', () => {
  let component: AddRewardComponent
  let fixture: ComponentFixture<AddRewardComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [getTranslocoModule(), ReactiveFormsModule],
      providers: [
        provideAppConstants(),
        provideApi(),
        {
          provide: DIALOG_DATA,
          useValue: {}
        }
      ],
      declarations: [AddRewardComponent]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRewardComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
