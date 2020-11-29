import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TeamComponent } from './team.component'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
  declarations: [TeamComponent],
  imports: [
    CommonModule,
    TranslocoModule
  ],
  exports: [TeamComponent]
})
export class TeamModule { }
