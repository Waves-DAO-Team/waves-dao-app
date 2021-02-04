import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LandingPageComponent } from './landing-page.component'
import { RouterModule } from '@angular/router'
import { TranslocoModule } from '@ngneat/transloco'
import { PipesModule } from '@libs/pipes/pipes.module'
import { LandingPageRoutingModule } from '@pages/landing-page/landing-page-routing.module'
import { MatTabsModule } from '@angular/material/tabs'
import { GuidePageModule } from '@pages/guide-page/guide-page.module'
import {LinkModule} from "@ui/entity/link/link.module";
import {LinkContentModule} from "@services/link-content/link-content.module";

@NgModule({
  declarations: [LandingPageComponent],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    RouterModule,
    TranslocoModule,
    PipesModule,
    MatTabsModule,
    GuidePageModule,
    LinkModule,
    LinkContentModule
  ]
})
export class LandingPageModule { }
