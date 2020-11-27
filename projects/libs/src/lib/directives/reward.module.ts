import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RewardDirective } from './reward.directive'

@NgModule({
  declarations: [
    RewardDirective
  ],
  imports: [CommonModule],
  exports: [
    RewardDirective
  ]
})
export class RewardModule {}
