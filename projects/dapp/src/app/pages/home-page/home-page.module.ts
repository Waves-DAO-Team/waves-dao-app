import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { HomePageRoutingModule } from './home-page-routing.module'
import { HomePageComponent } from './home-page.component'
import { RouterModule } from '@angular/router'
import { TranslocoModule } from '@ngneat/transloco'
import { PipesModule } from '@libs/pipes/pipes.module'

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    RouterModule,
    TranslocoModule,
    PipesModule
  ]
})
export class HomePageModule { }
