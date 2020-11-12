import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import {TranslocoModule} from "@ngneat/transloco";

@NgModule({
  declarations: [ModalComponent],
  imports: [
    CommonModule,
    TranslocoModule
  ],
  exports: [ModalComponent]
})
export class ModalModule { }
