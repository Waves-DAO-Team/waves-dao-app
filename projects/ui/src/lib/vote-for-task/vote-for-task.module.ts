import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { VoteForTaskComponent } from './vote-for-task.component'
import { TranslocoModule } from '@ngneat/transloco'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'

@NgModule({
  declarations: [VoteForTaskComponent],
  imports: [
    CommonModule,
    TranslocoModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [VoteForTaskComponent]
})
export class VoteForTaskModule { }
