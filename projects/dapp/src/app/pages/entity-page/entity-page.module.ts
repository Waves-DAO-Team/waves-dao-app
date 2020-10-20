import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { EntityPageRoutingModule } from './entity-page-routing.module'
import { EntityPageComponent } from './entity-page.component'

@NgModule({
  declarations: [EntityPageComponent],
  imports: [
    CommonModule,
    EntityPageRoutingModule
  ]
})
export class EntityPageModule { }
