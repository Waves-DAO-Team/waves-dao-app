import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { StatusesComponent } from './statuses.component'
import {TranslocoModule} from '@ngneat/transloco'



@NgModule({
  declarations: [StatusesComponent],
    imports: [
        CommonModule,
        TranslocoModule
    ],
  exports: [StatusesComponent]
})
export class StatusesModule { }
