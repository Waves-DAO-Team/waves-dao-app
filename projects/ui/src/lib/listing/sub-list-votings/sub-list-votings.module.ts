import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SubListVotingsComponent } from './sub-list-votings.component'
import { RouterModule } from '@angular/router'
import { TranslocoModule } from '@ngneat/transloco'
import { PipesModule } from '@libs/pipes/pipes.module'
import { TagModule } from '@ui/tag/tag.module'

@NgModule({
  declarations: [SubListVotingsComponent],
  imports: [
    CommonModule,
    RouterModule,
    TranslocoModule,
    PipesModule,
    TagModule
  ],
  exports: [SubListVotingsComponent]
})
export class SubListVotingsModule { }
