import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EntityComponent } from './entity.component'
import { UserService } from '@services/user/user.service'
import { provideApi, provideAppConstants } from '@constants'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { RouterTestingModule } from '@angular/router/testing'
import { HeaderModule } from '@ui/entity/header/header.module'
import { BodyModule } from '@ui/entity/body/body.module'
import { ControlsModule } from '@ui/entity/controls/controls.module'
import { TeamModule } from '@ui/team/team.module'
import { getTranslocoModule } from '@dapp/src/app/transloco-module.spec'
import { MarkdownModule, MarkdownService, SECURITY_CONTEXT } from 'ngx-markdown'
import { ReactiveFormsModule } from '@angular/forms'
import { MatDialogModule } from '@angular/material/dialog'
import { LinkContentModule } from '@services/link-content/link-content.module'
describe('EntityComponent', () => {
  let component: EntityComponent
  let fixture: ComponentFixture<EntityComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        getTranslocoModule(),
        RouterTestingModule,
        HeaderModule,
        BodyModule,
        ControlsModule,
        TeamModule,
        MarkdownModule,
        ReactiveFormsModule,
        LinkContentModule
      ],
      declarations: [EntityComponent],
      providers: [UserService, provideApi(), provideAppConstants(), MarkdownService, {
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
