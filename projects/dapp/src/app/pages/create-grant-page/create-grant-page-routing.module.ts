import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateGrantPageComponent} from "@pages/create-grant-page/create-grant-page.component";
import {CreateGrantPageGuard} from "@pages/create-grant-page/create-grant-page.guard";

const routes: Routes = [
  {
    path: '',
    component: CreateGrantPageComponent,
    pathMatch: 'full',
    canActivate: [CreateGrantPageGuard],
    data: {}
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateGrantPageRoutingModule { }
