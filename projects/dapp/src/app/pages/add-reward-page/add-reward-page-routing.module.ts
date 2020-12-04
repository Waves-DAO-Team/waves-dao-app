import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AddRewardPageComponent } from '@pages/add-reward-page/add-reward-page.component'
import { AddRewardPageGuard } from '@pages/add-reward-page/add-reward-page.guard'

const routes: Routes = [
  {
    path: '',
    component: AddRewardPageComponent,
    pathMatch: 'full',
    canActivate: [AddRewardPageGuard],
    data: {}
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddRewardPageRoutingModule { }
