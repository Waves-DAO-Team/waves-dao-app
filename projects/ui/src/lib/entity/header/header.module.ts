import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HeaderComponent } from './header.component'
import { TranslocoModule } from '@ngneat/transloco'
import { PipesModule } from '@libs/pipes/pipes.module'
import {FlowTextModule} from '@ui/flow-text/flow-text.module'

@NgModule({
  declarations: [HeaderComponent],
    imports: [
        PipesModule,
        CommonModule,
        TranslocoModule,
        FlowTextModule
    ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
