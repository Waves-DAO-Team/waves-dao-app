import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AllTeamsBtnComponent } from './all-teams-btn.component'
import {RouterModule} from '@angular/router'
import {TranslocoModule} from '@ngneat/transloco'



@NgModule({
  declarations: [AllTeamsBtnComponent],
  imports: [
    TranslocoModule,
    CommonModule,
    RouterModule
  ],
  exports: [AllTeamsBtnComponent]
})
export class AllTeamsBtnModule { }
