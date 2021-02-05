import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LinkComponent } from './link.component'
import { TranslocoModule } from '@ngneat/transloco'
import { MarkdownModule } from 'ngx-markdown'

@NgModule({
  declarations: [LinkComponent],
  imports: [
    CommonModule,
    TranslocoModule,
    MarkdownModule
  ],
  exports: [LinkComponent]
})
export class LinkModule { }
