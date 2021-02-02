import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusesComponent } from './statuses.component';



@NgModule({
  declarations: [StatusesComponent],
  imports: [
    CommonModule
  ],
  exports: [StatusesComponent]
})
export class StatusesModule { }
