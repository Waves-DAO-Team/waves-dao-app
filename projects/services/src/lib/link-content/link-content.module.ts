import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LinkContentPipe } from '@services/link-content/link-content.pipe'

@NgModule({
  declarations: [
    LinkContentPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LinkContentPipe
  ]
})
export class LinkContentModule { }
