import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EntityComponent } from './entity.component'

@NgModule({
  declarations: [EntityComponent],
  imports: [
    CommonModule
  ],
  exports: [EntityComponent]
})
export class EntityModule { }
