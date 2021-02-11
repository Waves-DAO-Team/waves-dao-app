import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoreListComponent } from './score-list.component';
import {VotingSquareModule} from "@ui/voting-square/voting-square.module";
import {StatusesModule} from "@ui/statuses/statuses.module";
import {TranslocoModule} from "@ngneat/transloco";

@NgModule({
  declarations: [ScoreListComponent],
  imports: [
    CommonModule,
    VotingSquareModule,
    StatusesModule,
    TranslocoModule,
  ],
  exports: [ScoreListComponent]
})
export class ScoreListModule { }
