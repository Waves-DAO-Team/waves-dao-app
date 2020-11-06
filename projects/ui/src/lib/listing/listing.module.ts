import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ListingComponent } from './listing.component'
import { RouterModule } from '@angular/router'
import { PipesModule } from '@libs/pipes/pipes.module'
import { TranslocoModule } from '@ngneat/transloco'
import { CollapseContainerModule } from '@ui/collapse-container/collapse-container.module'
import { TagModule } from '@ui/tag/tag.module'

@NgModule({
  declarations: [ListingComponent],
  imports: [
    CommonModule,
    RouterModule,
    TranslocoModule,
    PipesModule,
    TagModule,
    CollapseContainerModule
  ],
  exports: [ListingComponent]
})
export class ListingModule { }
