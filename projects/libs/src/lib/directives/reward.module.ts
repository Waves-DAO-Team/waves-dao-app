import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RewardDirective } from './reward.directive'

@NgModule({
  declarations: [
    RewardDirective,
    // BoldDirective
  ],
  imports: [CommonModule],
  exports: [
    RewardDirective,
    // BoldDirective
  ]
})
export class RewardModule {}
