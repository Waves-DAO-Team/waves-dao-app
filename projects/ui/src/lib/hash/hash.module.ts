import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HashComponent } from './hash.component'
import {TranslocoModule} from '@ngneat/transloco'



@NgModule({
  declarations: [HashComponent],
    imports: [
        CommonModule,
        TranslocoModule
    ],
  exports: [HashComponent]
})
export class HashModule { }
