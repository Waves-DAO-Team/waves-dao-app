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
import { DefaultTemplateComponent } from './default-template/default-template.component'
import { Web3TemplateComponent } from './web3-template/web3-template.component'
import {ProposeGrantModule} from '@ui/modals/propose-grant/propose-grant.module';

@NgModule({
  declarations: [ListingPageComponent, DefaultTemplateComponent, Web3TemplateComponent],
  imports: [
    CommonModule,
    ListingPageRoutingModule,
    ListingModule,
    TranslocoModule,
    NotFoundPageModule,
    LoadingPageModule,
    PipesModule,
    RouterModule,
    ProposeGrantModule
  ]
})
export class ListingPageModule { }
