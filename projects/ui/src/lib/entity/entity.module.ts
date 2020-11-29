import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EntityComponent } from './entity.component'
import { TranslocoModule } from '@ngneat/transloco'
import { RouterModule } from '@angular/router'
import { ModalModule } from '@ui/modal/modal.module'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { MarkdownModule } from 'ngx-markdown'
import {HeaderModule} from "@ui/entity/header/header.module";
import {BodyModule} from "@ui/entity/body/body.module";
import {ControlsModule} from "@ui/entity/controls/controls.module";
import {TeamModule} from "@ui/entity/team/team.module";

@NgModule({
  declarations: [EntityComponent],
  imports: [
    CommonModule,
    TranslocoModule,
    RouterModule,
    ModalModule,
    FormsModule,
    MarkdownModule,
    HeaderModule,
    BodyModule,
    ControlsModule,
    TeamModule,
    ReactiveFormsModule

  ],
  exports: [EntityComponent]
})
export class EntityModule { }
