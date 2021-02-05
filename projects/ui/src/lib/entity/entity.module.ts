import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EntityComponent } from './entity.component'
import { TranslocoModule } from '@ngneat/transloco'
import { RouterModule } from '@angular/router'

import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HeaderModule } from '@ui/entity/header/header.module'
import { BodyModule } from '@ui/entity/body/body.module'
import { ControlsModule } from '@ui/entity/controls/controls.module'
import { TeamModule } from '@ui/team/team.module'
import { DialogModule } from '@ui/dialog/dialog.module'
import { ApplyModule } from '@ui/modals/apply/apply.module'
import { LinkContentModule } from '@services/link-content/link-content.module'
import { VoteForTaskModule } from '@ui/vote-for-task/vote-for-task.module'
import { StepperModule } from '@ui/stepper/stepper.module'
import { AcceptWorkResultModule } from '@ui/modals/accept-work-result/accept-work-result.module'
import { AddMemberModule } from '@ui/modals/add-member/add-member.module'
import { TeamsAndSolutionsModule } from '@ui/teams-and-solutions/teams-and-solutions.module'
import { LinkModule } from '@ui/entity/link/link.module'

@NgModule({
  declarations: [EntityComponent],
  imports: [
    CommonModule,
    TranslocoModule,
    RouterModule,
    FormsModule,
    HeaderModule,
    BodyModule,
    ControlsModule,
    TeamsAndSolutionsModule,
    TeamModule,
    ReactiveFormsModule,
    DialogModule,
    ApplyModule,
    LinkContentModule,
    VoteForTaskModule,
    StepperModule,
    AcceptWorkResultModule,
    AddMemberModule,
    LinkModule
  ],
  exports: [EntityComponent]
})
export class EntityModule { }
