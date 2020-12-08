import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EntityComponent } from './entity.component'
import { TranslocoModule } from '@ngneat/transloco'
import { RouterModule } from '@angular/router'

import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HeaderModule } from '@ui/entity/header/header.module'
import { BodyModule } from '@ui/entity/body/body.module'
import { ControlsModule } from '@ui/entity/controls/controls.module'
import { TeamModule } from '@ui/entity/team/team.module'
import { DialogModule } from '@ui/dialog/dialog.module'
import { ApplyModule } from '@ui/modals/apply/apply.module'

@NgModule({
  declarations: [EntityComponent],
  imports: [
    CommonModule,
    TranslocoModule,
    RouterModule,
    FormsModule,
    HeaderModule,
    BodyModule,
    ControlsModule,
    TeamModule,
    ReactiveFormsModule,
    DialogModule,
    ApplyModule
  ],
  exports: [EntityComponent]
})
export class EntityModule { }
