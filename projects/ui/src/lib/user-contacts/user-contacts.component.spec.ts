import { ComponentFixture, TestBed } from '@angular/core/testing'

import { UserContactsComponent } from './user-contacts.component'
import { provideApi, provideAppConstants } from '@constants'
import { MatSnackBarModule } from '@angular/material/snack-bar'

describe('UserContactsComponent', () => {
  let component: UserContactsComponent
  let fixture: ComponentFixture<UserContactsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      declarations: [UserContactsComponent],
      providers: [
        provideAppConstants(),
        provideApi()
      ]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(UserContactsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
