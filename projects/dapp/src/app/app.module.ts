import { BrowserModule } from '@angular/platform-browser'
import { LOCALE_ID, NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { DevGridModule } from '@ui/dev-grid/dev-grid.module'
import { WINDOW_PROVIDERS } from '@services/window'
import { CommonLayoutModule, provideCommonLayoutFooter, provideCommonLayoutHeader } from '@ui/layout/common-layout'
import { HeaderComponent } from '@ui/header/header.component'
import { FooterComponent } from '@ui/footer/footer.component'
import { HttpClientModule } from '@angular/common/http'
import { TranslocoRootModule } from './transloco/transloco-root.module'
import { HeaderModule } from '@ui/header/header.module'
import { TagModule } from '@ui/tag/tag.module'
import { ModalModule } from '@ui/modal/modal.module'
import { FooterModule } from '@ui/footer/footer.module'
import { NgProgressModule } from 'ngx-progressbar'
import { NgProgressHttpModule } from 'ngx-progressbar/http'
import { provideApi, provideAppConstants } from './app.providers'
import { PipesModule } from '@libs/pipes/pipes.module'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MarkdownModule } from 'ngx-markdown'
import { ContractMenuModule } from '@ui/contract-menu/contract-menu.module'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgProgressModule,
    NgProgressHttpModule,
    BrowserAnimationsModule,
    DevGridModule,
    CommonLayoutModule,
    HttpClientModule,
    TranslocoRootModule,
    HeaderModule,
    TagModule,
    ModalModule,
    FooterModule,
    PipesModule,
    MatSnackBarModule,
    MarkdownModule.forRoot(),
    ContractMenuModule
  ],
  providers: [
    WINDOW_PROVIDERS,
    { provide: LOCALE_ID, useValue: 'en-GB' },
    provideCommonLayoutHeader(HeaderComponent),
    provideCommonLayoutFooter(FooterComponent),
    provideAppConstants(),
    provideApi()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
