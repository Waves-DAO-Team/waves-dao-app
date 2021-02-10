import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {TeamsAndSolutionsComponent} from './teams-and-solutions.component'
import {TranslocoModule} from '@ngneat/transloco'
import {StatusesModule} from '@ui/statuses/statuses.module'
import {MatTooltipModule} from '@angular/material/tooltip'
import {VotingSquareModule} from '@ui/voting-square/voting-square.module'
import {PipesModule} from "@libs/pipes/pipes.module";

@NgModule({
  declarations: [TeamsAndSolutionsComponent],
  imports: [
    MatTooltipModule,
    CommonModule,
    TranslocoModule,
    StatusesModule,
    VotingSquareModule,
    PipesModule,
  ],
  exports: [TeamsAndSolutionsComponent]
})
export class TeamsAndSolutionsModule {
}
