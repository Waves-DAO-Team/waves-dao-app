import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DevGridComponent } from './dev-grid.component'

@NgModule({
  imports: [CommonModule],
  declarations: [DevGridComponent],
  exports: [DevGridComponent]
})
export class DevGridModule {}
