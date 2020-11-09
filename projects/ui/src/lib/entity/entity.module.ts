import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EntityComponent } from './entity.component'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
  declarations: [EntityComponent],
  imports: [
    CommonModule,
    TranslocoModule
  ],
  exports: [EntityComponent]
})
export class EntityModule { }
