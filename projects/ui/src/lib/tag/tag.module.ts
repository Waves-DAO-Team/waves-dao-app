import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TagComponent } from './tag.component'
import { TranslocoModule } from '@ngneat/transloco'
import { PipesModule } from '@libs/pipes/pipes.module'
import { RouterModule } from '@angular/router'

@NgModule({
  declarations: [TagComponent],
  exports: [
    TagComponent
  ],
  imports: [
    CommonModule,
    TranslocoModule,
    PipesModule,
    RouterModule
  ]
})
export class TagModule { }
