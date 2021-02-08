import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import {AllTeamsPageComponent} from '@pages/all-teams-page/all-teams-page.component'

const routes: Routes = [
  {
    path: '',
    component: AllTeamsPageComponent,
    pathMatch: 'full',
    data: {}
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllTeamsPageRoutingModule { }
