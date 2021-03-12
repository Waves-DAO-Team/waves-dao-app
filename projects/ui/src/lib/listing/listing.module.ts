import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ListingComponent } from './listing.component'
import { RouterModule } from '@angular/router'
import { PipesModule } from '@libs/pipes/pipes.module'
import { TranslocoModule } from '@ngneat/transloco'
import { TagModule } from '@ui/tag/tag.module'
import { SubListModule } from '@ui/listing/sub-list/sub-list.module'
import { MatDialogModule } from '@angular/material/dialog'
import {SubListVotingsModule} from '@ui/listing/sub-list-votings/sub-list-votings.module'

@NgModule({
  declarations: [ListingComponent],
  imports: [
    CommonModule,
    RouterModule,
    TranslocoModule,
    PipesModule,
    TagModule,
    SubListModule,
    SubListVotingsModule,
    MatDialogModule
  ],
  exports: [ListingComponent]
})
export class ListingModule { }
