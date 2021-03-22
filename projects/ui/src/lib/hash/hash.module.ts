import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HashComponent } from './hash.component'



@NgModule({
  declarations: [HashComponent],
  imports: [
    CommonModule
  ],
  exports: [HashComponent]
})
export class HashModule { }
