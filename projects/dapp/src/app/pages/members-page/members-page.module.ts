import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { MembersPageRoutingModule } from './members-page-routing.module'
import { MembersPageComponent } from './members-page.component'
import { TranslocoModule } from '@ngneat/transloco'
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [MembersPageComponent],
    imports: [
        CommonModule,
        MembersPageRoutingModule,
        TranslocoModule,
        MatIconModule
    ]
})
export class MembersPageModule { }
