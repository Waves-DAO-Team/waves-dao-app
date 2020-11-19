import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HeaderComponent } from './header.component'
import { TranslocoModule } from '@ngneat/transloco'
import { PipesModule } from '@libs/pipes/pipes.module'
import { RouterModule } from '@angular/router'
import { PopupModule } from '@ui/popup/popup.module'

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    TranslocoModule,
    PipesModule,
    RouterModule,
    PopupModule
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
