import { ComponentFixture, TestBed } from '@angular/core/testing'

import { VoteForTaskComponent } from './vote-for-task.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { provideApi, provideAppConstants } from '@constants'
import { DIALOG_DATA } from '@ui/dialog/dialog.tokens'
import { RouterTestingModule } from '@angular/router/testing'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { getTranslocoModule } from '@dapp/src/app/transloco-module.spec'

describe('VoteForTaskComponent', () => {
  let component: VoteForTaskComponent
  let fixture: ComponentFixture<VoteForTaskComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, MatSnackBarModule, getTranslocoModule()],
      providers: [
        provideAppConstants(),
        provideApi(),
        {
          provide: DIALOG_DATA,
          useValue: {}
        }
      ],
      declarations: [VoteForTaskComponent]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteForTaskComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
