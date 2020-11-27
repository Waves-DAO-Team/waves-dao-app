import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import {TranslocoModule} from "@ngneat/transloco";



@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    TranslocoModule
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
