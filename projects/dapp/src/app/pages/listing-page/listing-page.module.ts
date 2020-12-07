import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ListingPageRoutingModule } from './listing-page-routing.module'
import { ListingPageComponent } from './listing-page.component'
import { ListingModule } from '@ui/listing/listing.module'
import { TranslocoModule } from '@ngneat/transloco'
import { NotFoundPageModule } from '@pages/not-found-page/not-found-page.module'
import { LoadingPageModule } from '@pages/loading-page/loading-page.module'
import { PipesModule } from '@libs/pipes/pipes.module'
import { RouterModule } from '@angular/router'

@NgModule({
  declarations: [ListingPageComponent],
  imports: [
    CommonModule,
    ListingPageRoutingModule,
    ListingModule,
    TranslocoModule,
    NotFoundPageModule,
    LoadingPageModule,
    PipesModule,
    RouterModule
  ]
})
export class ListingPageModule { }
