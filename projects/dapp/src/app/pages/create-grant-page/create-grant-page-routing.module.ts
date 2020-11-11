import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateGrantPageComponent} from "@pages/create-grant-page/create-grant-page.component";

const routes: Routes = [
  {
    path: '',
    component: CreateGrantPageComponent,
    pathMatch: 'full',
    data: {}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateGrantPageRoutingModule { }
