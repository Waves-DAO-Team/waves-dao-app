import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ScoreListComponent } from './score-list.component'
import {VotingSquareModule} from '@ui/voting-square/voting-square.module'
import {StatusesModule} from '@ui/statuses/statuses.module'
import {TranslocoModule} from '@ngneat/transloco'
import {PipesModule} from '@libs/pipes/pipes.module'
import {MatTooltipModule} from '@angular/material/tooltip'

@NgModule({
  declarations: [ScoreListComponent],
    imports: [
        CommonModule,
        VotingSquareModule,
        StatusesModule,
        TranslocoModule,
        PipesModule,
        MatTooltipModule
    ],
  exports: [ScoreListComponent]
})
export class ScoreListModule { }
