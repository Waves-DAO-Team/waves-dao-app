import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CommonLayoutComponent } from './common-layout.component'
import { RouterModule } from '@angular/router'
import { NgxdModule } from '@ngxd/core'
import { PopupModule } from '@ui/popup/popup.module'

@NgModule({
  declarations: [CommonLayoutComponent],
  imports: [CommonModule, RouterModule, NgxdModule, PopupModule],
  exports: [CommonLayoutComponent]
})
export class CommonLayoutModule {}
