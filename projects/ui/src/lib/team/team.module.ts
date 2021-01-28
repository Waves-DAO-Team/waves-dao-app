import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TeamComponent } from './team.component'
import { TranslocoModule } from '@ngneat/transloco'
import { PipesModule } from '@libs/pipes/pipes.module'
import { ApplyModule } from '@ui/modals/apply/apply.module'

@NgModule({
  declarations: [TeamComponent],
  imports: [
    CommonModule,
    TranslocoModule,
    PipesModule,
    ApplyModule
  ],
  exports: [TeamComponent]
})
export class TeamModule { }
