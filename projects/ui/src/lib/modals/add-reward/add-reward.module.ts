import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddRewardComponent } from './add-reward.component';
import {TranslocoModule} from "@ngneat/transloco";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [AddRewardComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslocoModule
  ],
  exports: [AddRewardComponent]
})
export class AddRewardModule { }
