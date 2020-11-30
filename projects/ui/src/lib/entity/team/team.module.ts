import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TeamComponent } from './team.component'
import { TranslocoModule } from '@ngneat/transloco'
import {SortByPipe} from "@libs/pipes/sort-by.pipe.ts";
import {PipesModule} from "@libs/pipes/pipes.module";

@NgModule({
  declarations: [TeamComponent],
  imports: [
    CommonModule,
    TranslocoModule,
    PipesModule
  ],
  exports: [TeamComponent]
})
export class TeamModule { }
