import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { CreateEntityPageRoutingModule } from './create-entity-page-routing.module'
import { CreateEntityPageComponent } from './create-entity-page.component'

@NgModule({
  declarations: [CreateEntityPageComponent],
  imports: [
    CommonModule,
    CreateEntityPageRoutingModule
  ]
})
export class CreateEntityPageModule { }
