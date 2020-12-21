import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserContactsComponent } from './user-contacts.component';



@NgModule({
  declarations: [UserContactsComponent],
  imports: [
    CommonModule
  ],
  exports: [UserContactsComponent]
})
export class UserContactsModule { }
