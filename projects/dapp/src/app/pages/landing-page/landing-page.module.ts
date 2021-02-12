import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LandingPageComponent } from './landing-page.component'
import { RouterModule } from '@angular/router'
import { TranslocoModule } from '@ngneat/transloco'
import { PipesModule } from '@libs/pipes/pipes.module'
import { LandingPageRoutingModule } from '@pages/landing-page/landing-page-routing.module'
import { MatTabsModule } from '@angular/material/tabs'
import {LinkContentModule} from '@services/link-content/link-content.module'
import {NotFoundPageModule} from '@pages/not-found-page/not-found-page.module'
import {LoadingPageModule} from '@pages/loading-page/loading-page.module'

@NgModule({
  declarations: [LandingPageComponent],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    RouterModule,
    TranslocoModule,
    PipesModule,
    MatTabsModule,
    LinkContentModule,
    NotFoundPageModule,
    LoadingPageModule
  ]
})
export class LandingPageModule { }
