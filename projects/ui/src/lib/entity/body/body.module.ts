import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BodyComponent } from './body.component'
import { TranslocoModule } from '@ngneat/transloco'
import { MarkdownModule } from 'ngx-markdown'

@NgModule({
  declarations: [BodyComponent],
  imports: [
    CommonModule,
    TranslocoModule,
    MarkdownModule
  ],
  exports: [BodyComponent]
})
export class BodyModule { }
