import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditGrantComponent } from './edit-grant.component';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslocoModule} from '@ngneat/transloco';
import {RewardModule} from '@libs/directives/reward.module';



@NgModule({
  declarations: [EditGrantComponent],
  imports: [
    RewardModule,
    CommonModule,
    ReactiveFormsModule,
    TranslocoModule
  ],
  exports: [EditGrantComponent]
})
export class EditGrantModule { }
