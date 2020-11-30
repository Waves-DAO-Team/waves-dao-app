import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { MembersPageRoutingModule } from './members-page-routing.module'
import { MembersPageComponent } from './members-page.component'

@NgModule({
  declarations: [MembersPageComponent],
  imports: [
    CommonModule,
    MembersPageRoutingModule
  ]
})
export class MembersPageModule { }
