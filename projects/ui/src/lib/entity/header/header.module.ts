import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HeaderComponent } from './header.component'
import { TranslocoModule } from '@ngneat/transloco'
import { PipesModule } from '@libs/pipes/pipes.module'
import {FlowTextModule} from '@ui/flow-text/flow-text.module'
import {HashModule} from '@ui/hash/hash.module'

@NgModule({
  declarations: [HeaderComponent],
    imports: [
        PipesModule,
        CommonModule,
        TranslocoModule,
        FlowTextModule,
        HashModule
    ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
