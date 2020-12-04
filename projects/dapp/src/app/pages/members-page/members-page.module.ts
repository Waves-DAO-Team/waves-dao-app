import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { MembersPageRoutingModule } from './members-page-routing.module'
import { MembersPageComponent } from './members-page.component'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
  declarations: [MembersPageComponent],
  imports: [
    CommonModule,
    MembersPageRoutingModule,
    TranslocoModule
  ]
})
export class MembersPageModule { }
