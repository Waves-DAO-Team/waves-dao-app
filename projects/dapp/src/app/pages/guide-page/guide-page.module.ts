import { NgModule } from '@angular/core'
import { GuidePageComponent } from './guide-page.component'
import {RouterModule} from '@angular/router'
import {TranslocoModule} from '@ngneat/transloco'
import {PipesModule} from '@libs/pipes/pipes.module'
import {CommonModule} from '@angular/common'
import {GuidePageRoutingModule} from '@pages/guide-page/guide-page-routing.module'

@NgModule({
  declarations: [GuidePageComponent],
  imports: [
    CommonModule,
    GuidePageRoutingModule,
    RouterModule,
    TranslocoModule,
    PipesModule
  ]
})
export class GuidePageModule { }
