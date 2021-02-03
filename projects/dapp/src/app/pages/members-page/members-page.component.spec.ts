import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MembersPageComponent } from './members-page.component'
import { provideApi, provideAppConstants } from '@constants'
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { getTranslocoModule } from '@dapp/src/app/transloco-module.spec'
import { UserContactsModule } from '@ui/user-contacts/user-contacts.module'
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog'

describe('MembersPageComponent', () => {
  let component: MembersPageComponent
  let fixture: ComponentFixture<MembersPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        getTranslocoModule(),
        UserContactsModule,
        MatDialogModule,
      ],
      declarations: [MembersPageComponent],
      providers: [
        provideAppConstants(),
        provideApi(),
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
