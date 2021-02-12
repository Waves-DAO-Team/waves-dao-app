import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UserContactsComponent } from './user-contacts.component'
import {PipesModule} from "@libs/pipes/pipes.module";

@NgModule({
  declarations: [UserContactsComponent],
  imports: [
    PipesModule,
    CommonModule
  ],
  exports: [UserContactsComponent]
})
export class UserContactsModule { }
