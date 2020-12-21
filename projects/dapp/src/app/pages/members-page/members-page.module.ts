import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {MembersPageRoutingModule} from './members-page-routing.module'
import {MembersPageComponent} from './members-page.component'
import {TranslocoModule} from '@ngneat/transloco'
import {MatIconModule} from '@angular/material/icon';
import {UserContactsModule} from '@ui/user-contacts/user-contacts.module';
import {RouterModule} from "@angular/router";
import {ListingPageRoutingModule} from "@pages/listing-page/listing-page-routing.module";
import {ListingModule} from "@ui/listing/listing.module";
import {NotFoundPageModule} from "@pages/not-found-page/not-found-page.module";
import {LoadingPageModule} from "@pages/loading-page/loading-page.module";
import {PipesModule} from "@libs/pipes/pipes.module";
import {ProposeGrantModule} from "@ui/modals/propose-grant/propose-grant.module";

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
  ]
})
export class MembersPageModule {
}
