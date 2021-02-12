import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FlowTextComponent} from './flow-text.component'
import {TranslocoModule} from '@ngneat/transloco'
import {PipesModule} from '@libs/pipes/pipes.module'


@NgModule({
  declarations: [FlowTextComponent],
  imports: [
    CommonModule,
    TranslocoModule,
    PipesModule
  ],
  exports: [FlowTextComponent]
})
export class FlowTextModule {
}
