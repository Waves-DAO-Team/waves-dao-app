import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {TeamComponent} from './team.component'
import {TranslocoModule} from '@ngneat/transloco'
import {PipesModule} from '@libs/pipes/pipes.module'
import {ApplyModule} from '@ui/modals/apply/apply.module'
import {StatusesModule} from "@ui/statuses/statuses.module";
import {MatTooltipModule} from '@angular/material/tooltip';
import {VotingSquareModule} from "@ui/voting-square/voting-square.module";

@NgModule({
  declarations: [TeamComponent],
  imports: [
    MatTooltipModule,
    CommonModule,
    TranslocoModule,
    PipesModule,
    ApplyModule,
    StatusesModule,
    VotingSquareModule
  ],
  exports: [TeamComponent]
})
export class TeamModule {
}
