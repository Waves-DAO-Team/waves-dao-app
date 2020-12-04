import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AddRewardPageRoutingModule } from './add-reward-page-routing.module'
import { AddRewardPageComponent } from './add-reward-page.component'
import { ReactiveFormsModule } from '@angular/forms'
import { TranslocoModule } from '@ngneat/transloco'
import { RewardModule } from '@libs/directives/reward.module'
import { AddRewardPageGuard } from '@pages/add-reward-page/add-reward-page.guard'

@NgModule({
  declarations: [AddRewardPageComponent],
  imports: [
    RewardModule,
    CommonModule,
    AddRewardPageRoutingModule,
    ReactiveFormsModule,
    TranslocoModule
  ],
  providers: [
    AddRewardPageGuard
  ]

})
export class AddRewardPageModule { }
