import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { MembersPageRoutingModule } from './members-page-routing.module'
import { MembersPageComponent } from './members-page.component'
import { TranslocoModule } from '@ngneat/transloco'
import { MatIconModule } from '@angular/material/icon'
import { UserContactsModule } from '@ui/user-contacts/user-contacts.module'
import { RouterModule } from '@angular/router'
import { PipesModule } from '@libs/pipes/pipes.module'
import { DialogModule } from '@ui/dialog/dialog.module';

@NgModule({
  declarations: [MembersPageComponent],
  imports: [
    CommonModule,
    MembersPageRoutingModule,
    TranslocoModule,
    MatIconModule,
    UserContactsModule,
    RouterModule,
    PipesModule,
    RouterModule,
    DialogModule
  ]
})
export class MembersPageModule {
}
