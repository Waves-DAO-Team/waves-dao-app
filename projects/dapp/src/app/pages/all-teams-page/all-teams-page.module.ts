import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AllTeamsPageRoutingModule } from './all-teams-page-routing.module'
import { AllTeamsPageComponent } from './all-teams-page.component'
import {TranslocoModule} from '@ngneat/transloco'


@NgModule({
  declarations: [AllTeamsPageComponent],
  imports: [
    CommonModule,
    AllTeamsPageRoutingModule,
    TranslocoModule,
  ]
})
export class AllTeamsPageModule { }
