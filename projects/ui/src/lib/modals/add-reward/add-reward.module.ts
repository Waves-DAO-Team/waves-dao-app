import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AddRewardComponent } from './add-reward.component'
import { TranslocoModule } from '@ngneat/transloco'
import { ReactiveFormsModule } from '@angular/forms'
import { RewardModule } from '@libs/directives/reward.module'

@NgModule({
  declarations: [AddRewardComponent],
  imports: [
    RewardModule,
    CommonModule,
    ReactiveFormsModule,
    TranslocoModule
  ],
  exports: [AddRewardComponent]
})
export class AddRewardModule { }
