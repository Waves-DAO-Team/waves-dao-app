import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SubmitSolutionComponent} from './submit-solution.component';
import {ReactiveFormsModule} from "@angular/forms";
import {TranslocoModule} from "@ngneat/transloco";


@NgModule({
  declarations: [SubmitSolutionComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslocoModule,
  ],
  exports: [SubmitSolutionComponent]
})
export class SubmitSolutionModule {
}
