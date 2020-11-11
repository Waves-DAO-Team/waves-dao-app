import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HeaderComponent } from './header.component'
import { TranslocoModule } from '@ngneat/transloco'
import { PipesModule } from '@libs/pipes/pipes.module'
import { Router, RouterModule } from '@angular/router'

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    TranslocoModule,
    PipesModule,
    RouterModule
  ],
  providers: [Router],
  exports: [HeaderComponent]
})
export class HeaderModule { }
