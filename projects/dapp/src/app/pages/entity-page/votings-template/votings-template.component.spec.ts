import { ComponentFixture, TestBed } from '@angular/core/testing'
import { VotingsTemplateComponent } from './votings-template.component'
import { MatDialogModule } from '@angular/material/dialog'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { provideApi, provideAppConstants } from '@constants'
import { getTranslocoModule } from '@dapp/src/app/transloco-module.spec'
import { RouterTestingModule } from '@angular/router/testing'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { EntityModule } from '@ui/entity/entity.module'
import { MarkdownModule, MarkdownService, SECURITY_CONTEXT } from 'ngx-markdown'
import { VoteForTaskModule } from '@ui/vote-for-task/vote-for-task.module'
import { StepperModule } from '@ui/stepper/stepper.module'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import {FlowTextModule} from '@ui/flow-text/flow-text.module'
import {ScoreListModule} from '@ui/score-list/score-list.module'

describe('VotingsTemplateComponent', () => {
  let component: VotingsTemplateComponent
  let fixture: ComponentFixture<VotingsTemplateComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, HttpClientTestingModule, getTranslocoModule(), RouterTestingModule, MatSnackBarModule, EntityModule,
        MarkdownModule,
        VoteForTaskModule,
        StepperModule,
        NoopAnimationsModule,
        FlowTextModule,
        ScoreListModule
      ],
      declarations: [VotingsTemplateComponent],
      providers: [
        provideAppConstants(),
        provideApi(),
        MarkdownService, {
          provide: SECURITY_CONTEXT,
          useValue: 0
        }
      ]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingsTemplateComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
