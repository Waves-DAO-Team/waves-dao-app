import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TeamsAndSolutionsComponent } from './teams-and-solutions.component'
import { TranslocoModule } from '@ngneat/transloco'
import {StatusesModule} from "@ui/statuses/statuses.module";

@NgModule({
  declarations: [TeamsAndSolutionsComponent],
    imports: [
        CommonModule,
        TranslocoModule,
        StatusesModule

    ],
  exports: [TeamsAndSolutionsComponent]
})
export class TeamsAndSolutionsModule { }
