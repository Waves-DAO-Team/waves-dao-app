import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FlowTextComponent } from './flow-text.component'
import {TranslocoModule} from '@ngneat/transloco'



@NgModule({
  declarations: [FlowTextComponent],
    imports: [
        CommonModule,
        TranslocoModule
    ],
  exports: [FlowTextComponent]
})
export class FlowTextModule { }
