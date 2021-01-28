import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ApplyComponent } from './apply.component'

import { ReactiveFormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
  declarations: [ApplyComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslocoModule
  ],
  exports: [ApplyComponent]
})
export class ApplyModule { }
