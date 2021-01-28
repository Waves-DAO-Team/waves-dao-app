import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TeamsAndSolutionsComponent } from './teams-and-solutions.component'
import { UserService } from '@services/user/user.service'
import { provideApi, provideAppConstants } from '@constants'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { getTranslocoModule } from '@dapp/src/app/transloco-module.spec'
import { RouterTestingModule } from '@angular/router/testing'
import { MatSnackBarModule } from '@angular/material/snack-bar'

describe('TeamsAndSolutionsComponent', () => {
  let component: TeamsAndSolutionsComponent
  let fixture: ComponentFixture<TeamsAndSolutionsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        getTranslocoModule(),
        RouterTestingModule,
        MatSnackBarModule
      ],
      declarations: [TeamsAndSolutionsComponent],
      providers: [
        provideAppConstants(),
        provideApi(),
        UserService,
        provideApi()]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsAndSolutionsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
