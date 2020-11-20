import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamPageRoutingModule } from './team-page-routing.module';
import { TeamPageComponent } from './team-page.component';


@NgModule({
  declarations: [TeamPageComponent],
  imports: [
    CommonModule,
    TeamPageRoutingModule
  ]
})
export class TeamPageModule { }
