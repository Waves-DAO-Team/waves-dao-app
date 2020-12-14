import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ControlsComponent } from './controls.component'
import { RouterModule } from '@angular/router'
import { TranslocoModule } from '@ngneat/transloco'
import { FormsModule } from '@angular/forms'
import { PipesModule } from '@libs/pipes/pipes.module'
import {AddRewardModule} from "@ui/modals/add-reward/add-reward.module";
import {EditGrantModule} from "@ui/modals/edit-grant/edit-grant.module";
import {AddTaskDetailsModule} from "@ui/modals/add-task-details/add-task-details.module";

@NgModule({
  declarations: [ControlsComponent],
  imports: [
    RouterModule,
    CommonModule,
    TranslocoModule,
    FormsModule,
    AddRewardModule,
    PipesModule,
    EditGrantModule,
    AddTaskDetailsModule
  ],
  exports: [ControlsComponent]
})
export class ControlsModule { }
