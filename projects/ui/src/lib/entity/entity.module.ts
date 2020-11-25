import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EntityComponent } from './entity.component'
import { TranslocoModule } from '@ngneat/transloco'
import { RouterModule } from '@angular/router'
import { ModalModule } from '@ui/modal/modal.module'
import { FormsModule } from '@angular/forms'
import {MarkdownModule} from "ngx-markdown";

@NgModule({
  declarations: [EntityComponent],
  imports: [
    CommonModule,
    TranslocoModule,
    RouterModule,
    ModalModule,
    FormsModule,
    MarkdownModule,

  ],
  exports: [EntityComponent]
})
export class EntityModule { }
