import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ListingComponent } from './listing.component'
import { RouterModule } from '@angular/router'
import { PipesModule } from '@libs/pipes/pipes.module'
import { TranslocoModule } from '@ngneat/transloco'
import { TagModule } from '@ui/tag/tag.module'
import { SubListModule } from '@ui/listing/sub-list/sub-list.module'
import { MatDialogModule } from '@angular/material/dialog'

@NgModule({
  declarations: [ListingComponent],
  imports: [
    CommonModule,
    RouterModule,
    TranslocoModule,
    PipesModule,
    TagModule,
    SubListModule,
    MatDialogModule
  ],
  exports: [ListingComponent]
})
export class ListingModule { }
