import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RelativeRoutePipe, RoutePipe, RoutesPipe } from './route-path.pipe'
import { SortByTeamPipe } from '@libs/pipes/sort-by-team.pipe'
import {PriceFormattingPipe} from "@libs/pipes/price-formatting";

@NgModule({
  declarations: [
    RoutePipe,
    RoutesPipe,
    RelativeRoutePipe,
    SortByTeamPipe,
    PriceFormattingPipe
  ],
  imports: [CommonModule],
  exports: [
    RoutePipe,
    RoutesPipe,
    RelativeRoutePipe,
    SortByTeamPipe,
    PriceFormattingPipe
  ]
})
export class PipesModule {}
