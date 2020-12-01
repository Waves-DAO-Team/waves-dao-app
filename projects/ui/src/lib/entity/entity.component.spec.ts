import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EntityComponent } from './entity.component'
import { UserService } from '@services/user/user.service'
import { API, provideApi } from '@constants'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { TranslocoModule } from '@ngneat/transloco'
import { RouterTestingModule } from '@angular/router/testing'
import { HeaderModule } from '@ui/entity/header/header.module'
import { BodyModule } from '@ui/entity/body/body.module'
import { ControlsModule } from '@ui/entity/controls/controls.module'
import { TeamModule } from '@ui/entity/team/team.module'
import { ModalModule } from '@ui/modal/modal.module'
import { getTranslocoModule } from '@dapp/src/app/transloco-module.spec'
import { MarkdownModule, MarkdownService, SECURITY_CONTEXT } from 'ngx-markdown'
import { environment } from '@dapp/src/environments/environment'
import { ReactiveFormsModule } from '@angular/forms'
describe('EntityComponent', () => {
  let component: EntityComponent
  let fixture: ComponentFixture<EntityComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        getTranslocoModule(),
        RouterTestingModule,
        HeaderModule,
        BodyModule,
        ControlsModule,
        TeamModule,
        ModalModule,
        MarkdownModule,
        ReactiveFormsModule
      ],
      declarations: [EntityComponent],
      providers: [UserService, provideApi(), MarkdownService, {
        provide: SECURITY_CONTEXT,
        useValue: 0
      }]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
