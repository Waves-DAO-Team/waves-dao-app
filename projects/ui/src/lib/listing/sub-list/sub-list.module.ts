import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SubListComponent } from './sub-list.component'
import { RouterModule } from '@angular/router'
import { TranslocoModule } from '@ngneat/transloco'
import { PipesModule } from '@libs/pipes/pipes.module'
import { TagModule } from '@ui/tag/tag.module'

@NgModule({
  declarations: [SubListComponent],
  imports: [
    CommonModule,
    RouterModule,
    TranslocoModule,
    PipesModule,
    TagModule
  ],
  exports: [SubListComponent]
})
export class SubListModule { }
