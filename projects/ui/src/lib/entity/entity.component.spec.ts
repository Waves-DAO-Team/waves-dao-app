import {ComponentFixture, TestBed} from '@angular/core/testing'

import {EntityComponent} from './entity.component'
import {UserService} from '@services/user/user.service'
import {provideApi, provideAppConstants} from '@constants'
import {HttpClientTestingModule} from '@angular/common/http/testing'
import {MatSnackBarModule} from '@angular/material/snack-bar'
import {RouterTestingModule} from '@angular/router/testing'
import {HeaderModule} from '@ui/entity/header/header.module'
import {BodyModule} from '@ui/entity/body/body.module'
import {ControlsModule} from '@ui/entity/controls/controls.module'
import {getTranslocoModule} from '@dapp/src/app/transloco-module.spec'
import {MarkdownModule, MarkdownService, SECURITY_CONTEXT} from 'ngx-markdown'
import {ReactiveFormsModule} from '@angular/forms'
import {MatDialogModule} from '@angular/material/dialog'
import {LinkContentModule} from '@services/link-content/link-content.module'

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
        MarkdownModule,
        ReactiveFormsModule,
        LinkContentModule
      ],
      declarations: [EntityComponent],
      providers: [UserService, provideApi(), provideAppConstants(), MarkdownService, {
        provide: SECURITY_CONTEXT,
        useValue: {
          isHashValid: true
        },
      }]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityComponent)
    component = fixture.componentInstance
    if (component.grant)
      {fixture.detectChanges()}
  })

  it('should create', () => {
    if (component.grant)
      {expect(component).toBeTruthy()}
  })
})
