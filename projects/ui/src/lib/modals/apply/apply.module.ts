import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ApplyComponent } from './apply.component'

import { ReactiveFormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'
import {PipesModule} from "@libs/pipes/pipes.module";

@NgModule({
  declarations: [ApplyComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PipesModule,
    TranslocoModule
  ],
  exports: [ApplyComponent]
})
export class ApplyModule { }
