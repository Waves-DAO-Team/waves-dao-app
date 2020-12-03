import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CardComponent } from './card.component'
import { RouterModule } from '@angular/router'
import { TranslocoModule } from '@ngneat/transloco'
import { PipesModule } from '@libs/pipes/pipes.module'
import { TagModule } from '@ui/tag/tag.module'

@NgModule({
  declarations: [CardComponent],
  imports: [
    CommonModule,
    RouterModule,
    TranslocoModule,
    PipesModule,
    TagModule
  ],
  exports: [CardComponent]
})
export class CardModule { }
