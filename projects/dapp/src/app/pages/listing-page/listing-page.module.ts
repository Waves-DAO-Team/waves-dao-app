import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ListingPageRoutingModule } from './listing-page-routing.module'
import { ListingPageComponent } from './listing-page.component'
import { ListingModule } from '@ui/listing/listing.module'

@NgModule({
  declarations: [ListingPageComponent],
  imports: [
    CommonModule,
    ListingPageRoutingModule,
    ListingModule
  ]
})
export class ListingPageModule { }
