import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AboutPageRoutingModule } from './about-page-routing.module'
import { AboutPageComponent } from './about-page.component'
import { TranslocoModule } from '@ngneat/transloco'
import { MarkdownModule } from 'ngx-markdown'
import { NotFoundPageModule } from '@pages/not-found-page/not-found-page.module'
import { LoadingPageModule } from '@pages/loading-page/loading-page.module'

@NgModule({
  declarations: [AboutPageComponent],
  imports: [
    CommonModule,
    AboutPageRoutingModule,
    TranslocoModule,
    MarkdownModule,
    NotFoundPageModule,
    LoadingPageModule
  ]
})
export class AboutPageModule { }
