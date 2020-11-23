import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { TeamPageComponent } from '@pages/team-page/team-page.component'

const routes: Routes = [{
  path: '',
  component: TeamPageComponent,
  pathMatch: 'full',
  data: {}
}]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamPageRoutingModule { }
