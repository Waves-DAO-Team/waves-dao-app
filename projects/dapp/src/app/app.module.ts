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

import { FooterModule } from '@ui/footer/footer.module'
import { NgProgressModule } from 'ngx-progressbar'
import { NgProgressHttpModule } from 'ngx-progressbar/http'
import { provideApi, provideAppConstants } from './app.providers'
import { PipesModule } from '@libs/pipes/pipes.module'
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatSnackBarModule
} from '@angular/material/snack-bar'
import { MarkdownModule } from 'ngx-markdown'
import { MatDialogModule } from '@angular/material/dialog'
import { environment } from '@dapp/src/environments/environment'
import { GtagModule } from 'angular-gtag'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MatDialogModule,
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
    FooterModule,
    PipesModule,
    MatSnackBarModule,
    MarkdownModule.forRoot(),
    GtagModule.forRoot({ trackingId: environment.gtag, trackPageviews: true })
  ],
  providers: [
    WINDOW_PROVIDERS,
    { provide: LOCALE_ID, useValue: 'en-GB' },
    provideCommonLayoutHeader(HeaderComponent),
    provideCommonLayoutFooter(FooterComponent),
    provideAppConstants(),
    provideApi(),
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 5000 } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
