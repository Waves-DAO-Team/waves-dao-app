import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { VoteForTaskComponent } from './vote-for-task.component'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
  declarations: [VoteForTaskComponent],
  imports: [
    CommonModule,
    TranslocoModule
  ],
  exports: [VoteForTaskComponent]
})
export class VoteForTaskModule { }
