import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CollapseContainerComponent } from './collapse-container.component'
import { TranslocoModule } from '@ngneat/transloco'
import { PipesModule } from '@libs/pipes/pipes.module'
import { RouterModule } from '@angular/router'

@NgModule({
  declarations: [CollapseContainerComponent],
  exports: [
    CollapseContainerComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    CommonModule,
    TranslocoModule,
    PipesModule,
    RouterModule
  ]
})
export class CollapseContainerModule { }
