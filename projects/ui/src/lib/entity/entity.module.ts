import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EntityComponent } from './entity.component'
import { TranslocoModule } from '@ngneat/transloco'
import { RouterModule } from '@angular/router'
import { ModalModule } from '@ui/modal/modal.module'
import { FormsModule } from '@angular/forms'
import { MarkdownModule } from 'ngx-markdown'
import {HeaderModule} from "@ui/entity/header/header.module";

@NgModule({
  declarations: [EntityComponent],
  imports: [
    CommonModule,
    TranslocoModule,
    RouterModule,
    ModalModule,
    FormsModule,
    MarkdownModule,
    HeaderModule

  ],
  exports: [EntityComponent]
})
export class EntityModule { }
