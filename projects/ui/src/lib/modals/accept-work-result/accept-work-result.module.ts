import { AcceptWorkResultComponent } from './accept-work-result.component';
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import {TranslocoModule} from "@ngneat/transloco";

@NgModule({
  declarations: [AcceptWorkResultComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslocoModule,
  ],
  exports: [AcceptWorkResultComponent]
})
export class AcceptWorkResultModule { }


