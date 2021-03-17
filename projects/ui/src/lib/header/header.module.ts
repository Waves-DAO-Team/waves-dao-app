import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HeaderComponent } from './header.component'
import { TranslocoModule } from '@ngneat/transloco'
import { PipesModule } from '@libs/pipes/pipes.module'
import { RouterModule } from '@angular/router'
import {MatTooltipModule} from '@angular/material/tooltip'
import {ClipboardModule} from '@angular/cdk/clipboard'

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    TranslocoModule,
    PipesModule,
    RouterModule,
    MatTooltipModule,
    ClipboardModule
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
