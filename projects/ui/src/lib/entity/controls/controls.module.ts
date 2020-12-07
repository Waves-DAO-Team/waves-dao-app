import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ControlsComponent } from './controls.component'
import { RouterModule } from '@angular/router'
import { TranslocoModule } from '@ngneat/transloco'
import { FormsModule } from '@angular/forms'
import { PipesModule } from '@libs/pipes/pipes.module'

@NgModule({
  declarations: [ControlsComponent],
  imports: [
    RouterModule,
    CommonModule,
    TranslocoModule,
    FormsModule,
    PipesModule
  ],
  exports: [ControlsComponent]
})
export class ControlsModule { }
