import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ContractMenuComponent } from './contract-menu.component'
import { TranslocoModule } from '@ngneat/transloco'
import { PipesModule } from '@libs/pipes/pipes.module'
import { RouterModule } from '@angular/router'

@NgModule({
  declarations: [ContractMenuComponent],
  imports: [
    CommonModule,
    TranslocoModule,
    PipesModule,
    RouterModule
  ],
  exports: [ContractMenuComponent]
})
export class ContractMenuModule { }
