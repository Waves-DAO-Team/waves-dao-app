import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TeamsAndSolutionsComponent } from './teams-and-solutions.component'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
  declarations: [TeamsAndSolutionsComponent],
  imports: [
    CommonModule,
    TranslocoModule
  ],
  exports: [TeamsAndSolutionsComponent]
})
export class TeamsAndSolutionsModule { }
