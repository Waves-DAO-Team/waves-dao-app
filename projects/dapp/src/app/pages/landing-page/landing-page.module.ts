import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page.component';
import {HomePageRoutingModule} from "@pages/home-page/home-page-routing.module";
import {RouterModule} from "@angular/router";
import {TranslocoModule} from "@ngneat/transloco";
import {PipesModule} from "@libs/pipes/pipes.module";
import {LandingPageRoutingModule} from "@pages/landing-page/landing-page-routing.module";



@NgModule({
  declarations: [LandingPageComponent],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    RouterModule,
    TranslocoModule,
    PipesModule
  ]
})
export class LandingPageModule { }
