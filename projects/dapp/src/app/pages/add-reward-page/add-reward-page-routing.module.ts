import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ApplyGrantPageComponent } from '@pages/apply-grant-page/apply-grant-page.component'
import { ApplyGrantPageGuard } from '@pages/apply-grant-page/apply-grant-page.guard'
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
