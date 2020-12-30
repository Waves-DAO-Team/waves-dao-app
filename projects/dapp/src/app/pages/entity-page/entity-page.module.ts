import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { EntityPageRoutingModule } from './entity-page-routing.module'
import { EntityPageComponent } from './entity-page.component'
import { TranslocoModule } from '@ngneat/transloco'
import { PipesModule } from '@libs/pipes/pipes.module'
import { EntityModule } from '@ui/entity/entity.module'
import { NotFoundPageModule } from '@pages/not-found-page/not-found-page.module'
import { LoadingPageModule } from '@pages/loading-page/loading-page.module'
import { InterhackTemplateComponent } from './interhack-template/interhack-template.component'
import { Web3TemplateComponent } from '@pages/entity-page/web3-template/web3-template.component'
import { DisruptiveTemplateComponent } from '@pages/entity-page/disruptive-template/disruptive-template.component'
import { TeamModule } from '@ui/team/team.module'
import { VoteForTaskModule } from '@ui/vote-for-task/vote-for-task.module'
import {StepperModule} from '@ui/stepper/stepper.module';
import {TeamsAndSolutionsModule} from "@ui/teams-and-solutions/teams-and-solutions.module";

@NgModule({
  declarations: [EntityPageComponent, Web3TemplateComponent, InterhackTemplateComponent, DisruptiveTemplateComponent],
  imports: [
    CommonModule,
    EntityPageRoutingModule,
    TranslocoModule,
    PipesModule,
    EntityModule,
    NotFoundPageModule,
    LoadingPageModule,
    TeamModule,
    VoteForTaskModule,
    TeamsAndSolutionsModule,
    StepperModule
  ]
})
export class EntityPageModule { }
