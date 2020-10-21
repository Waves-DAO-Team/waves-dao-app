import { BrowserModule } from '@angular/platform-browser'
import { LOCALE_ID, NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { DevGridModule } from '@ui/dev-grid/dev-grid.module'
import { WINDOW_PROVIDERS } from '@services/window'
import { CommonLayoutComponentModel, CommonLayoutModule, provideCommonLayoutFooter, provideCommonLayoutHeader } from '@ui/layout/common-layout'
import { HeaderComponent } from '@ui/header/header.component'
import { FooterComponent } from '@ui/footer/footer.component'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DevGridModule,
    CommonLayoutModule
  ],
  providers: [
    WINDOW_PROVIDERS,
    { provide: LOCALE_ID, useValue: 'en-GB' },
    provideCommonLayoutHeader(HeaderComponent),
    provideCommonLayoutFooter(FooterComponent)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
