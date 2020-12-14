import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTaskDetailsComponent } from './add-task-details.component';
import {ReactiveFormsModule} from "@angular/forms";
import {TranslocoModule} from "@ngneat/transloco";
import {RewardModule} from "@libs/directives/reward.module";



@NgModule({
  declarations: [AddTaskDetailsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslocoModule,
    RewardModule
  ],
  exports: [AddTaskDetailsComponent]
})
export class AddTaskDetailsModule { }
