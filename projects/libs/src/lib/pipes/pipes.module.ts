import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RelativeRoutePipe, RoutePipe, RoutesPipe } from './route-path.pipe'
import { SortByTeamPipe } from '@libs/pipes/sort-by-team.pipe'
import { PriceFormattingPipe } from '@libs/pipes/price-formatting'
import {SortBySolutionsPipe} from '@libs/pipes/sort-by-solutions.pipe'
import {SortByScorePipe} from '@libs/pipes/sort-by-score.pipe'
import {SafeHtmPipe} from '@libs/pipes/safe-html.pipe'
import {LinkHttpPipe} from '@libs/pipes/link-http.pipe'

@NgModule({
  declarations: [
    RoutePipe,
    RoutesPipe,
    RelativeRoutePipe,
    SortByTeamPipe,
    SortBySolutionsPipe,
    SortByScorePipe,
    PriceFormattingPipe,
    SafeHtmPipe,
    LinkHttpPipe
  ],
  imports: [CommonModule],
  exports: [
    RoutePipe,
    RoutesPipe,
    RelativeRoutePipe,
    SortByTeamPipe,
    SortBySolutionsPipe,
    SortByScorePipe,
    PriceFormattingPipe,
    SafeHtmPipe,
    LinkHttpPipe
  ]
})
export class PipesModule {}
