import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ListingPageRoutingModule } from './listing-page-routing.module'
import { ListingPageComponent } from './listing-page.component'

@NgModule({
  declarations: [ListingPageComponent],
  imports: [
    CommonModule,
    ListingPageRoutingModule
  ]
})
export class ListingPageModule { }
